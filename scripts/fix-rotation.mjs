import { createClient } from '@supabase/supabase-js';
import sharp from 'sharp';

const SUPABASE_URL = 'https://optfcepolcjyregdaxpt.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
if (!SUPABASE_SERVICE_KEY) {
  console.error('❌ Manque SUPABASE_SERVICE_KEY\nUsage: SUPABASE_SERVICE_KEY="..." node scripts/fix-rotation.mjs');
  process.exit(1);
}

const BUCKET = 'Items-photos';
const db = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function listAllFiles() {
  const { data, error } = await db.storage.from(BUCKET).list('', { limit: 500 });
  if (error) throw error;
  return data.filter(f => f.name && /\.(jpe?g|png|heic|webp)$/i.test(f.name));
}

async function downloadFile(name) {
  const { data, error } = await db.storage.from(BUCKET).download(name);
  if (error) throw error;
  return Buffer.from(await data.arrayBuffer());
}

async function needsRotation(buffer) {
  const meta = await sharp(buffer).metadata();
  return meta.orientation && meta.orientation !== 1;
}

async function fixRotation(buffer) {
  return sharp(buffer)
    .rotate() // applique auto-rotation EXIF et supprime le tag
    .jpeg({ quality: 85 })
    .toBuffer();
}

async function getItemByPhotoFilename(filename) {
  const { data } = await db.from('items')
    .select('id, name, photo_url')
    .ilike('photo_url', `%${filename}%`)
    .single();
  return data;
}

async function run() {
  console.log('📦 Récupération des fichiers…');
  const files = await listAllFiles();
  console.log(`${files.length} fichiers trouvés\n`);

  let fixed = 0, skip = 0, fail = 0;

  for (const file of files) {
    process.stdout.write(`  ${file.name} → `);
    try {
      const buffer = await downloadFile(file.name);
      const rotate = await needsRotation(buffer);

      if (!rotate) {
        console.log('✓ ok');
        skip++;
        continue;
      }

      const item = await getItemByPhotoFilename(file.name);
      if (!item) {
        console.log('⚠️  aucun item associé, ignoré');
        skip++;
        continue;
      }

      const fixed_buffer = await fixRotation(buffer);
      const newName = `item-${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;

      const { error: uploadError } = await db.storage
        .from(BUCKET)
        .upload(newName, fixed_buffer, { contentType: 'image/jpeg' });
      if (uploadError) throw uploadError;

      const { data: urlData } = db.storage.from(BUCKET).getPublicUrl(newName);
      await db.from('items').update({ photo_url: urlData.publicUrl }).eq('id', item.id);
      await db.storage.from(BUCKET).remove([file.name]);

      console.log(`✅ corrigé  (${item.name})`);
      fixed++;
    } catch (err) {
      console.log(`❌ erreur: ${err.message}`);
      fail++;
    }

    await new Promise(r => setTimeout(r, 200));
  }

  console.log(`\n✅ ${fixed} corrigés  ✓ ${skip} ok  ❌ ${fail} erreurs`);
}

run().catch(console.error);
