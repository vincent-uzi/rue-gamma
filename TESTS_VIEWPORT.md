# Tests VIEWPORT-01

## À tester sur device réel (pas simulateur)

### iPhone SE (320px)
- [ ] Pas de scroll horizontal
- [ ] Contenu visible au-dessus du clavier
- [ ] Safe-area respectée (pas de contenu sous encoche)
- [ ] Navbar visible au-dessus de la barre iOS

### iPhone 13 (375px)
- [ ] Même tests que SE
- [ ] UI non cassée, bien alignée

### iPhone 14 Pro Max (428px)
- [ ] Même tests
- [ ] Pas de débordement

### Comportement app
- [ ] Impossible de zoomer (pinch ne fait rien)
- [ ] Pas de rebond vertical (overscroll)
- [ ] Status bar iOS noire/translucide

## Tests Chrome DevTools (avant test device)

1. Ouvrir DevTools
2. Mode responsive (Cmd+Shift+M)
3. Tester 320px / 375px / 428px
4. Vérifier alignements
