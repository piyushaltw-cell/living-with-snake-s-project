import { SnakeDanger, SnakeSpecies } from './types';

export const FREEDOMLAND_SNAKES: SnakeSpecies[] = [
  {
    id: 'spectacled-cobra',
    name: 'Spectacled Cobra',
    scientificName: 'Naja naja',
    dangerLevel: SnakeDanger.VENOMOUS,
    description: "Iconic hood with spectacle markings. Vital for controlling agricultural pests. While venomous, it usually gives a clear warning display before striking.",
    diet: 'Rodents, frogs, birds.',
    habitat: 'Open fields, forests, near villages.',
    imageUrl: 'https://res.cloudinary.com/roundglass/image/upload/f_auto/q_auto/f_auto/c_limit,w_auto:breakpoints_200_2560_100_5:1265/v1618322185/roundglass/Indian_Cobra_Naja_naja_by_Dr_Raju_Kasambe_DSCN4991_2_Dr.-Raju-Kasambe-CC-BY-SA-4.0_f7gbni.jpg'
  },
  {
    id: 'russells-viper',
    name: "Russell's Viper",
    scientificName: 'Daboia russelii',
    dangerLevel: SnakeDanger.VENOMOUS,
    description: "Vital for rodent control. Recognizable by three rows of brownish spots. Known for a loud, deep hiss when threatened.",
    diet: 'Rodents, small mammals.',
    habitat: 'Grassy fields, scrublands.',
    imageUrl: 'https://media.istockphoto.com/id/1180781958/photo/macro-photograph-of-the-extremely-venomous-russells-viper.jpg?s=612x612&w=0&k=20&c=Ru2VC3WQkq92Jd8iQ_QyMi8ZSIk1vdpN5KLSWKTAqgg='
  },
  {
    id: 'common-krait',
    name: 'Common Krait',
    scientificName: 'Bungarus caeruleus',
    dangerLevel: SnakeDanger.VENOMOUS,
    description: "Glossy black with thin white cross-bands. Strictly nocturnal and very shy during the day. Helps balance nature by preying on other snakes.",
    diet: 'Snakes, lizards, frogs.',
    habitat: 'Termite mounds, crevices, rat holes.',
    imageUrl: 'https://udupisnakeinthecity.com/wp-content/uploads/2024/09/WhatsApp-Image-2024-09-04-at-7.38.08-PM-1.jpeg'
  },
  {
    id: 'saw-scaled-viper',
    name: 'Saw-scaled Viper',
    scientificName: 'Echis carinatus',
    dangerLevel: SnakeDanger.VENOMOUS,
    description: "Small but loud. Rubs scales together to produce a 'sawing' sound as a warning. Essential for ecosystem health.",
    diet: 'Scorpions, large insects, lizards.',
    habitat: 'Sandy, rocky areas, dry scrub.',
    imageUrl: 'https://cdn.britannica.com/64/126764-004-EAC1A49B/Saw-scaled-viper.jpg'
  },
  {
    id: 'indian-rock-python',
    name: 'Indian Rock Python',
    scientificName: 'Python molurus',
    dangerLevel: SnakeDanger.HARMLESS,
    description: "A massive, non-venomous and slow-moving giant. Generally docile and avoids conflict. As a key predator of rodents, it is a friend to farmers and a marvel of nature.",
    diet: 'Mammals, birds, large lizards.',
    habitat: 'Marshes, rocky outcrops, dense forests.',
    imageUrl: 'https://static.toiimg.com/thumb/121955744.jpg?imgsize=178462&photoid=121955744&width=600&height=335&resizemode=75'
  },
  {
    id: 'file-snake',
    name: 'File Snake',
    scientificName: 'Acrochordus granulatus',
    dangerLevel: SnakeDanger.HARMLESS,
    description: "Unique for its extremely rough, sandpaper-like skin used to grip slippery prey. Primarily aquatic and docile, it is completely harmless to humans.",
    diet: 'Fish and crustaceans.',
    habitat: 'Coastal waters, estuaries, and mangroves.',
    imageUrl: 'https://res.cloudinary.com/roundglass/image/upload/v1632481967/rg/collective/media/hrvxtctyflxue8tmrkaz.jpg'
  },
  {
    id: 'common-trinket-snake',
    name: 'Common Trinket Snake',
    scientificName: 'Coelognathus helena',
    dangerLevel: SnakeDanger.HARMLESS,
    description: "A beautiful, non-venomous snake known for its striking geometric patterns and agile nature. It is harmless to humans and a great controller of garden pests.",
    diet: 'Small rodents, lizards, frogs.',
    habitat: 'Gardens, forests, agricultural lands.',
    imageUrl: 'https://static.inaturalist.org/photos/91817498/large.jpg'
  },
  {
    id: 'brahminy-blind-snake',
    name: 'Brahminy Blind Snake',
    scientificName: 'Indotyphlops braminus',
    dangerLevel: SnakeDanger.HARMLESS,
    description: "Tiny, shiny 'Worm Snake'. Harmless and excellent for soil health, feeding on ant and termite larvae. Found often in garden pots.",
    diet: 'Ant/termite eggs & larvae.',
    habitat: 'Gardens, loose soil.',
    imageUrl: 'https://rewildperth.com.au/rwwp/wp-content/uploads/2020/06/Blind-Snake-Barry-Pitman-2-.jpg'
  }
];