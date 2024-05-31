export interface ButtonInfo {
  label: string //Plain-text label to display to user
  icon: string //Font-Awesome id string for icon to display to user
}

export type ButtonInfoMap = Map<string, ButtonInfo>
export const known_buttons: ButtonInfoMap = new Map([
  [
    'help',
    {
      label: 'Help',
      icon: 'exclamation-circle'
    }
  ],
  [
    'drink',
    {
      label: 'Drink',
      icon: 'coffee'
    }
  ],
  [
    'food',
    {
      label: 'Food',
      icon: 'burger'
    }
  ],
  [
    'bathroom',
    {
      label: 'Bathroom',
      icon: 'toilet'
    }
  ],
  [
    'entertainment',
    {
      label: 'Entertainment',
      icon: 'television'
    }
  ],
  [
    'water',
    {
      label: 'Water',
      icon: 'glass-water'
    }
  ],
  [
    'salad',
    {
      label: 'Salad',
      icon: 'carrot'
    }
  ],
  [
    'walk',
    {
      label: 'Walk',
      icon: 'person-walking'
    }
  ],
  [
    'socialize',
    {
      label: 'Socialize',
      icon: 'people-group'
    }
  ]
])

//Bare basic keys used to initialize the system
export const basic_keys = ['help', 'drink', 'food', 'bathroom', 'entertainment']

export const button_label_unknown = 'Unknown'
