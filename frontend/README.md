# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

const initialState = {
userId: '',
name: '',
index: '',
traits: [],
class_type: '',
// level: 1,
// gender: '',
// age: 0,
// age_desc: '',
race: '',
// alignment_desc: '',
// alignment: '',
// experience_points: 0,
strength: 0,
dexterity: 0,
constitution: 0,
intelligence: 0,
wisdom: 0,
charisma: 0,
// size: '',
// size_desc: '',
proficiencies: [],
// languages: [],
// language_desc: '',
equipment: [],
// saving_throws: [],
skills: [],
class_specific: {},
// armor_class: 0,
// speed_desc: '',
// speed: {
// walk: 0,
// },
// hit_die: 0,
// constitution_modifier: 0,
hit_points: {
max: 0,
current: 0,
},
ability_score_bonuses: {},
// prof_bonus: {},
// features: [],
// spells: [],
};

<ConfirmRace>
   |        \
<PageIntro> <PageList>
                |
            <CollapsibleList>
                |         \
            <Select>   <ContextAwareToggle>

<ClassModal>
  |               \
<ConfirmClass>  <PageList>
  |                      \
  |                      <CollapsibleList>
  |                            |         \
<SelectionOverview>          <Select>   <ContextAwareToggle>
  |
<CollapsibleMenu>!isModal
