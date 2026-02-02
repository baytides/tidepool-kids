import { Location } from '@/types';

export const locations: Location[] = [
  // ===========================
  // NATURE HABITATS
  // ===========================
  {
    id: 'fitzgerald-tide-pools',
    name: 'Fitzgerald Marine Reserve',
    type: 'habitat',
    category: 'Tide Pool',
    icon: '🦀',
    color: '#26c6da',
    coordinates: [-122.5167, 37.5236],
    content: {
      title: 'Fitzgerald Marine Reserve',
      tagline: {
        k2: 'A rocky pool full of ocean friends!',
        grades35: 'Where the ocean meets the rocks!',
        grades68: 'A protected intertidal ecosystem on the San Mateo coast.',
      },
      description: {
        k2: 'Tide pools are little ponds by the ocean. When waves go back, animals stay in the pools!',
        grades35: 'Tide pools form when ocean water gets trapped between rocks at low tide. These natural aquariums are home to creatures specially adapted to survive both underwater and in open air.',
        grades68: 'Intertidal zones experience dramatic environmental fluctuations including temperature, salinity, and oxygen levels. Organisms in tide pools have evolved remarkable adaptations to survive these challenging conditions, making them valuable indicators of coastal ecosystem health.',
      },
      whyItMatters: {
        k2: 'These animals need clean water to live. We can help by not littering!',
        grades35: 'Tide pools support hundreds of species and help scientists monitor ocean health. Pollution and trampling can damage these fragile habitats.',
        grades68: 'Tide pool ecosystems provide crucial ecosystem services including coastal buffering and serving as nursery habitat for commercially important species. Climate change, ocean acidification, and human disturbance threaten these sensitive environments.',
      },
      funFacts: [
        {
          k2: 'Sea stars can grow back their arms!',
          grades35: 'Sea stars can regenerate lost arms, and some species can even grow a whole new body from just one arm!',
          grades68: 'Sea star regeneration involves complex cellular dedifferentiation, where specialized cells become stem-like and can form any tissue type needed.',
        },
        {
          k2: 'Hermit crabs switch shells when they grow!',
          grades35: 'Hermit crabs line up by size to trade shells - when one finds a bigger shell, they all move into new homes!',
          grades68: 'Hermit crabs exhibit "vacancy chains" - sequential shell exchanges where multiple crabs upgrade simultaneously.',
        },
      ],
      creatures: [
        {
          id: 'hermit-crab',
          name: 'Hermit Crab',
          emoji: '🦀',
          fact: {
            k2: 'They wear shells like backpacks! When they grow bigger, they find a new shell.',
            grades35: 'Hermit crabs borrow empty shells from other animals. As they grow, they must find larger shells to move into.',
            grades68: 'Hermit crabs exhibit sequential shell exchange behavior, often forming "vacancy chains" where multiple crabs swap shells in size order.',
          },
        },
        {
          id: 'sea-star',
          name: 'Sea Star',
          emoji: '⭐',
          fact: {
            k2: 'Sea stars have eyes at the tip of each arm!',
            grades35: 'Each arm of a sea star has a tiny eye that can detect light and movement.',
            grades68: 'Sea star eyespots contain photoreceptors that form low-resolution images, sufficient for navigation and predator detection.',
          },
        },
        {
          id: 'sea-anemone',
          name: 'Sea Anemone',
          emoji: '🌸',
          fact: {
            k2: 'They look like flowers but are animals that eat fish!',
            grades35: 'Sea anemones use stinging tentacles to catch small fish and shrimp that swim too close.',
            grades68: 'Anemones possess specialized cells called cnidocytes that fire harpoon-like structures containing neurotoxins.',
          },
        },
      ],
      coralIntro: {
        k2: 'Wow! Look at all the little pools! Let\'s see what animals are hiding!',
        grades35: 'Welcome to the tide pools! These rocky pools are like natural aquariums. Ready to explore?',
        grades68: 'This intertidal zone is one of the most dynamic ecosystems on Earth. Let\'s examine its biodiversity.',
      },
      takeAction: {
        k2: 'Look but don\'t touch! Put rocks back where you found them.',
        grades35: 'Stay on designated paths, never remove creatures, and pick up any litter you see.',
        grades68: 'Practice Leave No Trace principles, report pollution to park rangers, and consider volunteering for coastal cleanup events.',
      },
      principles: {
        primary: 'I',
        secondary: ['II', 'IV'],
        concepts: ['I-A', 'I-B', 'I-C', 'II-A', 'IV-B'],
      },
      standards: {
        k2: 'K-ESS3-3',
        grades35: '5-ESS3-1',
        grades68: 'MS-ESS3-3',
      },
    },
  },
  {
    id: 'pillar-point-harbor',
    name: 'Pillar Point Harbor',
    type: 'habitat',
    category: 'Tide Pool',
    icon: '🐙',
    color: '#7e57c2',
    coordinates: [-122.4951, 37.4960],
    content: {
      title: 'Pillar Point Harbor',
      tagline: {
        k2: 'Where octopuses hide in the rocks!',
        grades35: 'A harbor full of hidden sea life!',
        grades68: 'A protected harbor with rich intertidal biodiversity.',
      },
      description: {
        k2: 'Big rocks make great hiding spots for octopuses and crabs!',
        grades35: 'This harbor has calm waters and rocky shores where you can find octopuses, crabs, and colorful sea slugs.',
        grades68: 'The breakwater creates a protected environment that supports diverse invertebrate populations, including cephalopods and nudibranchs.',
      },
      whyItMatters: {
        k2: 'Octopuses are really smart! We need to keep their home clean.',
        grades35: 'This habitat is important for many species to find food and shelter. Keeping the water clean helps everyone.',
        grades68: 'Harbor ecosystems face unique pressures from boat traffic and runoff, making conservation efforts essential for maintaining biodiversity.',
      },
      funFacts: [
        {
          k2: 'Octopuses can change color in one second!',
          grades35: 'Octopuses can change both their color AND texture to match their surroundings perfectly.',
          grades68: 'Cephalopod chromatophores contain elastic sacs of pigment that expand and contract under neural control at millisecond timescales.',
        },
        {
          k2: 'Octopuses have 3 hearts!',
          grades35: 'An octopus has three hearts - two pump blood to the gills and one pumps it to the body.',
          grades68: 'The cephalopod circulatory system with three hearts compensates for the oxygen-carrying limitations of copper-based hemocyanin.',
        },
      ],
      creatures: [
        {
          id: 'giant-pacific-octopus',
          name: 'Giant Pacific Octopus',
          emoji: '🐙',
          fact: {
            k2: 'They have 8 arms and 3 hearts!',
            grades35: 'Giant Pacific octopuses have 8 arms with suckers, 3 hearts, and blue blood!',
            grades68: 'GPO (Enteroctopus dofleini) can grow to 16 feet and exhibit problem-solving intelligence comparable to some mammals.',
          },
        },
        {
          id: 'rock-crab',
          name: 'Rock Crab',
          emoji: '🦀',
          fact: {
            k2: 'They walk sideways!',
            grades35: 'Rock crabs walk sideways because their legs bend that way. It makes them fast!',
            grades68: 'The lateral gait of crabs evolved as an adaptation to their flattened body plan and leg joint structure.',
          },
        },
        {
          id: 'nudibranch',
          name: 'Nudibranch',
          emoji: '🐌',
          fact: {
            k2: 'They look like tiny rainbows!',
            grades35: 'Nudibranchs are colorful sea slugs. Their bright colors warn predators that they taste bad!',
            grades68: 'Nudibranch aposematic coloration often signals the presence of secondary metabolites sequestered from cnidarian prey.',
          },
        },
      ],
      coralIntro: {
        k2: 'Look! The rocks have so many hiding spots! Can you find the octopus?',
        grades35: 'This harbor is great for spotting sea life. Keep your eyes on the rocky areas!',
        grades68: 'The protected waters here create ideal conditions for observing cryptic species.',
      },
      takeAction: {
        k2: 'Be quiet so the animals don\'t get scared!',
        grades35: 'Move slowly and quietly. Animals hide when they sense movement.',
        grades68: 'Minimize disturbance by observing from a distance and avoiding direct contact with organisms.',
      },
      principles: {
        primary: 'I',
        secondary: ['II'],
        concepts: ['I-A', 'I-B', 'II-A'],
      },
      standards: {
        k2: 'K-ESS3-3',
        grades35: '5-ESS3-1',
        grades68: 'MS-ESS3-3',
      },
    },
  },
  {
    id: 'don-edwards-wetlands',
    name: 'Don Edwards Wetlands',
    type: 'habitat',
    category: 'Wetland',
    icon: '🦆',
    color: '#7cb342',
    coordinates: [-122.0628, 37.4983],
    content: {
      title: 'Don Edwards Wildlife Refuge',
      tagline: {
        k2: 'A rest stop for traveling birds!',
        grades35: 'Where millions of birds stop to refuel!',
        grades68: 'A critical stopover on the Pacific Flyway migration corridor.',
      },
      description: {
        k2: 'Wetlands are soggy places where birds find yummy food. It\'s like a bird restaurant!',
        grades35: 'Wetlands are areas where water covers the soil. They\'re like giant sponges that clean water and provide homes for birds and fish.',
        grades68: 'Wetlands function as biofilters, removing pollutants and excess nutrients from water while providing habitat for over 280 bird species in the San Francisco Bay ecosystem.',
      },
      whyItMatters: {
        k2: 'Birds need clean marshes to eat and rest. No littering!',
        grades35: 'Wetlands filter pollution, prevent floods, and give millions of migrating birds a place to rest and eat.',
        grades68: 'Coastal wetlands sequester carbon at rates 3-5x higher than terrestrial forests, making them critical for climate mitigation while supporting biodiversity.',
      },
      funFacts: [
        {
          k2: 'Some birds fly super far to visit here!',
          grades35: 'Some birds fly over 10,000 miles to visit Bay Area wetlands every year!',
          grades68: 'The Pacific Flyway migration corridor supports 1 billion birds annually, with San Francisco Bay providing essential habitat.',
        },
        {
          k2: 'Egrets stand really still to catch fish!',
          grades35: 'Great egrets can stand motionless for minutes, then strike at fish faster than you can blink!',
          grades68: 'Egret hunting success rates increase 300% when using the "stand and wait" strategy versus active foraging.',
        },
      ],
      creatures: [
        {
          id: 'great-egret',
          name: 'Great Egret',
          emoji: '🦢',
          fact: {
            k2: 'They stand perfectly still to catch fish, then strike like lightning!',
            grades35: 'Great egrets can stand motionless for several minutes waiting for the perfect moment to catch a fish.',
            grades68: 'Egrets possess a specialized neck vertebra structure that enables rapid strike acceleration exceeding 1,500°/second.',
          },
        },
        {
          id: 'harbor-seal',
          name: 'Harbor Seal',
          emoji: '🦭',
          fact: {
            k2: 'They can hold their breath for up to 30 minutes!',
            grades35: 'Harbor seals can dive deep and hold their breath for 30 minutes while hunting fish.',
            grades68: 'Harbor seals exhibit bradycardia during dives, slowing heart rate from 120 to 4 beats per minute to conserve oxygen.',
          },
        },
      ],
      coralIntro: {
        k2: 'Shh! Look at all the birds! This marsh is like a bird restaurant!',
        grades35: 'Welcome to the wetlands! Birds come from all over the world to visit here.',
        grades68: 'This salt marsh represents one of the most productive ecosystems per acre on Earth.',
      },
      takeAction: {
        k2: 'Be quiet so we don\'t scare the birds!',
        grades35: 'Keep dogs on leashes and stay on marked trails to protect nesting birds.',
        grades68: 'Support wetland restoration projects and advocate for policies protecting remaining Bay Area marshlands.',
      },
      principles: {
        primary: 'I',
        secondary: ['III'],
        concepts: ['I-B', 'III-A', 'III-B'],
      },
      standards: {
        k2: 'K-ESS3-3',
        grades35: '5-ESS3-1',
        grades68: 'MS-ESS3-3',
      },
    },
  },
  {
    id: 'palo-alto-baylands',
    name: 'Palo Alto Baylands',
    type: 'habitat',
    category: 'Wetland',
    icon: '🦅',
    color: '#43a047',
    coordinates: [-122.1066, 37.4587],
    content: {
      title: 'Palo Alto Baylands',
      tagline: {
        k2: 'A marshy home for so many birds!',
        grades35: 'Where the marsh meets the Bay!',
        grades68: 'A critical salt marsh ecosystem in the South Bay.',
      },
      description: {
        k2: 'This soggy place is full of birds looking for yummy snacks!',
        grades35: 'Salt marshes like this are important because they give birds a place to eat, rest, and raise their babies.',
        grades68: 'Salt marshes provide essential ecosystem services including flood mitigation, carbon sequestration, and nursery habitat for fish.',
      },
      whyItMatters: {
        k2: 'Birds need clean marshes to find food. No littering!',
        grades35: 'Wetlands filter dirty water and protect the shoreline from flooding. They\'re like nature\'s sponges!',
        grades68: 'Coastal wetlands store more carbon per hectare than most forests, making them critical for climate regulation.',
      },
      funFacts: [
        {
          k2: 'Some birds fly super far to visit here!',
          grades35: 'Migrating birds can fly over 10,000 miles to reach Bay Area wetlands!',
          grades68: 'The Pacific Flyway migration corridor sees millions of birds annually, with Bay wetlands serving as critical stopover sites.',
        },
        {
          k2: 'There\'s a tiny mouse that can swim in salty water!',
          grades35: 'The salt marsh harvest mouse is endangered and can only live in pickleweed marshes.',
          grades68: 'Reithrodontomys raviventris is endemic to San Francisco Bay, having evolved to drink hypersaline water.',
        },
      ],
      creatures: [
        {
          id: 'snowy-egret',
          name: 'Snowy Egret',
          emoji: '🦢',
          fact: {
            k2: 'They have bright yellow feet like rain boots!',
            grades35: 'Snowy egrets have yellow feet they use to stir up fish in shallow water.',
            grades68: 'The distinctive yellow lores and feet of breeding snowy egrets are used in courtship displays.',
          },
        },
        {
          id: 'salt-marsh-harvest-mouse',
          name: 'Salt Marsh Harvest Mouse',
          emoji: '🐭',
          fact: {
            k2: 'This tiny mouse can swim!',
            grades35: 'The salt marsh harvest mouse is endangered and can only live in pickleweed marshes.',
            grades68: 'Reithrodontomys raviventris is endemic to San Francisco Bay and adapted to drink saline water.',
          },
        },
        {
          id: 'pickleweed',
          name: 'Pickleweed',
          emoji: '🌿',
          fact: {
            k2: 'This plant loves salty water!',
            grades35: 'Pickleweed can survive in very salty soil where most plants would die.',
            grades68: 'Salicornia species excrete excess salt through specialized bladder cells on leaf surfaces.',
          },
        },
      ],
      coralIntro: {
        k2: 'Look at all the birds! This marsh is like a bird restaurant!',
        grades35: 'Welcome to the baylands! Birds come from all over the world to visit here.',
        grades68: 'This salt marsh represents one of the most productive ecosystems per acre on Earth.',
      },
      takeAction: {
        k2: 'Stay on the trail so we don\'t step on bird nests!',
        grades35: 'Keep dogs on leashes and stay on marked trails to protect ground-nesting birds.',
        grades68: 'Support wetland restoration efforts and advocate for policies protecting remaining Bay marshlands.',
      },
      principles: {
        primary: 'I',
        secondary: ['III'],
        concepts: ['I-B', 'III-A', 'III-B'],
      },
      standards: {
        k2: 'K-ESS3-3',
        grades35: '5-ESS3-1',
        grades68: 'MS-ESS3-3',
      },
    },
  },
  {
    id: 'crissy-field-marsh',
    name: 'Crissy Field Marsh',
    type: 'habitat',
    category: 'Wetland',
    icon: '🦩',
    color: '#00897b',
    coordinates: [-122.4652, 37.8040],
    content: {
      title: 'Crissy Field Marsh',
      tagline: {
        k2: 'A tiny marsh by the Golden Gate!',
        grades35: 'A restored wetland with a view of the bridge!',
        grades68: 'A successfully restored tidal marsh in the Presidio.',
      },
      description: {
        k2: 'This little marsh was fixed up so birds and fish could live here again!',
        grades35: 'Crissy Field used to be a runway for airplanes. Now it\'s been restored as a wetland and birds are coming back!',
        grades68: 'The Crissy Field restoration project transformed 100 acres of abandoned airfield into functioning tidal marsh, demonstrating successful urban ecosystem restoration.',
      },
      whyItMatters: {
        k2: 'People worked hard to bring the birds back. We can help by keeping it clean!',
        grades35: 'This shows we can fix habitats that were damaged. When we restore wetlands, wildlife returns!',
        grades68: 'Urban wetland restoration provides measurable ecosystem services while serving as outdoor classrooms for environmental education.',
      },
      funFacts: [
        {
          k2: 'Airplanes used to land right here!',
          grades35: 'This marsh was once a concrete runway where the first airmail flights took off!',
          grades68: 'The restoration removed 87,000 cubic yards of debris and reintroduced native tidal marsh vegetation.',
        },
        {
          k2: 'Over 100 kinds of birds visit this tiny marsh!',
          grades35: 'More than 100 bird species have been spotted at Crissy Field since it was restored!',
          grades68: 'Post-restoration monitoring documented a 300% increase in bird species diversity within 5 years.',
        },
      ],
      creatures: [
        {
          id: 'great-blue-heron',
          name: 'Great Blue Heron',
          emoji: '🦩',
          fact: {
            k2: 'They stand super still waiting for fish!',
            grades35: 'Great blue herons can stand perfectly still for hours waiting to strike at passing fish.',
            grades68: 'Ardea herodias employs a sit-and-wait hunting strategy, with strike speeds under 0.05 seconds.',
          },
        },
        {
          id: 'pacific-chorus-frog',
          name: 'Pacific Chorus Frog',
          emoji: '🐸',
          fact: {
            k2: 'Their singing tells us spring is here!',
            grades35: 'Pacific chorus frogs are tiny but their "ribbit" call is surprisingly loud!',
            grades68: 'Pseudacris regilla calls indicate healthy wetland conditions and are used to monitor restoration success.',
          },
        },
      ],
      coralIntro: {
        k2: 'This used to be an airport! Now it\'s home for birds and frogs!',
        grades35: 'Look how people turned a runway into a wetland! Nature came back!',
        grades68: 'This restoration project demonstrates ecological recovery in urban environments.',
      },
      takeAction: {
        k2: 'Stay on the paths so birds feel safe!',
        grades35: 'Keep dogs leashed and stay on trails to protect nesting birds.',
        grades68: 'Support urban restoration projects and participate in volunteer monitoring programs.',
      },
      principles: {
        primary: 'III',
        secondary: ['I', 'V'],
        concepts: ['III-A', 'III-B', 'I-B', 'V-B'],
      },
      standards: {
        k2: 'K-ESS3-3',
        grades35: '5-ESS3-1',
        grades68: 'MS-ESS3-3',
      },
    },
  },
  {
    id: 'ocean-beach',
    name: 'Ocean Beach',
    type: 'habitat',
    category: 'Beach',
    icon: '🏖️',
    color: '#ffb74d',
    coordinates: [-122.5108, 37.7594],
    content: {
      title: 'Ocean Beach',
      tagline: {
        k2: 'Where sand meets the big waves!',
        grades35: 'San Francisco\'s wild Pacific shore!',
        grades68: 'A high-energy beach ecosystem on the Pacific coast.',
      },
      description: {
        k2: 'Ocean Beach has lots of sand and big waves. Animals hide under the sand!',
        grades35: 'Ocean Beach is a 3.5-mile stretch of sand facing the mighty Pacific Ocean. Even though it looks empty, lots of creatures live hidden in the sand.',
        grades68: 'Ocean Beach represents a high-energy dissipative beach system, with significant sand transport and dynamic dune ecosystems supporting endemic invertebrate species.',
      },
      whyItMatters: {
        k2: 'Beaches protect the city from big waves. We keep them clean!',
        grades35: 'Beaches protect our coastline from storms and provide habitat for shorebirds and marine mammals.',
        grades68: 'Coastal dune systems provide natural storm buffers while supporting species like the endangered Western snowy plover.',
      },
      funFacts: [
        {
          k2: 'The sand came from rocks that wore down over millions of years!',
          grades35: 'The sand at Ocean Beach comes from rocks that were worn down over millions of years by water and wind!',
          grades68: 'Beach sediments derive from erosion of coastal cliffs and inland watersheds, with grain size reflecting wave energy levels.',
        },
        {
          k2: 'Sand crabs can bury themselves in 2 seconds!',
          grades35: 'Sand crabs can completely bury themselves in the sand in less than 2 seconds!',
          grades68: 'Emerita analoga uses specialized appendages to burrow at rates exceeding body length per second.',
        },
      ],
      creatures: [
        {
          id: 'sand-crab',
          name: 'Sand Crab',
          emoji: '🦀',
          fact: {
            k2: 'They can bury themselves in the sand in less than 2 seconds!',
            grades35: 'Sand crabs burrow backwards into the sand and filter tiny food particles from the waves.',
            grades68: 'Emerita analoga serves as a bioindicator species, with populations reflecting domoic acid levels from harmful algal blooms.',
          },
        },
        {
          id: 'pelican',
          name: 'Brown Pelican',
          emoji: '🐦',
          fact: {
            k2: 'They dive from 60 feet in the air to catch fish!',
            grades35: 'Brown pelicans plunge-dive from 60 feet up, using special air sacs to cushion the impact.',
            grades68: 'Pelican air sacs and modified cervical vertebrae prevent injury during 40 mph dives.',
          },
        },
      ],
      coralIntro: {
        k2: 'Look at those big waves! Animals hide in the sand here!',
        grades35: 'The waves here are powerful! Let\'s discover what lives hidden in the sand.',
        grades68: 'This high-energy beach supports a unique assemblage of invertebrate species.',
      },
      takeAction: {
        k2: 'Don\'t leave trash on the beach!',
        grades35: 'Pick up litter and never disturb resting shorebirds or seals.',
        grades68: 'Participate in beach cleanups and support coastal conservation organizations.',
      },
      principles: {
        primary: 'I',
        secondary: ['IV'],
        concepts: ['I-C', 'IV-B'],
      },
      standards: {
        k2: 'K-ESS3-3',
        grades35: '5-ESS3-1',
        grades68: 'MS-ESS3-3',
      },
    },
  },
  {
    id: 'stinson-beach',
    name: 'Stinson Beach',
    type: 'habitat',
    category: 'Beach',
    icon: '🦈',
    color: '#ff7043',
    coordinates: [-122.6440, 37.9012],
    content: {
      title: 'Stinson Beach',
      tagline: {
        k2: 'A beach where sharks swim by!',
        grades35: 'Where the redwoods meet the sea!',
        grades68: 'A dynamic coastal ecosystem in the Red Triangle.',
      },
      description: {
        k2: 'This beach has waves, sand, and sometimes sharks swimming nearby!',
        grades35: 'Stinson Beach sits at the edge of Marin County where Mt. Tam\'s redwood forests meet the Pacific Ocean.',
        grades68: 'Located in the "Red Triangle," this beach is part of a productive coastal upwelling zone that supports large marine predator populations.',
      },
      whyItMatters: {
        k2: 'Sharks help keep the ocean healthy by eating sick fish!',
        grades35: 'Sharks are important predators that keep fish populations balanced. Healthy oceans need sharks!',
        grades68: 'Apex predators like white sharks regulate prey populations and maintain trophic cascades that support overall ecosystem health.',
      },
      funFacts: [
        {
          k2: 'White sharks are curious and swim by to look at surfers!',
          grades35: 'Great white sharks sometimes investigate surfers from below - they\'re curious, not hungry for humans!',
          grades68: 'Juvenile white sharks use Bay Area waters as a nursery, with most human encounters being investigatory rather than predatory.',
        },
        {
          k2: 'Sea otters used to live here and might come back!',
          grades35: 'Sea otters were once common here and scientists hope they\'ll return as their populations recover.',
          grades68: 'Historical sea otter range extended throughout California; recolonization of Marin waters could help restore kelp forest ecosystems.',
        },
      ],
      creatures: [
        {
          id: 'white-shark',
          name: 'Great White Shark',
          emoji: '🦈',
          fact: {
            k2: 'They can smell a tiny drop of blood from far away!',
            grades35: 'Great white sharks can detect one drop of blood in 25 gallons of water!',
            grades68: 'Carcharodon carcharias possesses electroreceptors (ampullae of Lorenzini) that detect prey bioelectric fields.',
          },
        },
        {
          id: 'harbor-seal-stinson',
          name: 'Harbor Seal',
          emoji: '🦭',
          fact: {
            k2: 'They rest on rocks to warm up in the sun!',
            grades35: 'Harbor seals "haul out" onto rocks to rest, warm up, and escape predators.',
            grades68: 'Harbor seal haul-out sites are protected under the Marine Mammal Protection Act.',
          },
        },
      ],
      coralIntro: {
        k2: 'Wow, big waves! And sometimes sharks swim by - how cool!',
        grades35: 'This beach is part of the "Red Triangle" where sharks like to hunt!',
        grades68: 'The nutrient-rich waters here support a complex marine food web.',
      },
      takeAction: {
        k2: 'Never bother seals resting on the beach!',
        grades35: 'Stay 100 feet from resting seals and never feed wildlife.',
        grades68: 'Report marine mammal strandings to The Marine Mammal Center and support shark research programs.',
      },
      principles: {
        primary: 'I',
        secondary: ['II'],
        concepts: ['I-A', 'I-C', 'II-A'],
      },
      standards: {
        k2: 'K-ESS3-3',
        grades35: '5-ESS3-1',
        grades68: 'MS-ESS3-3',
      },
    },
  },
  // ===========================
  // INFRASTRUCTURE
  // ===========================
  {
    id: 'water-treatment',
    name: 'Water Treatment Plant',
    type: 'infrastructure',
    category: 'Water',
    icon: '💧',
    color: '#42a5f5',
    coordinates: [-122.3894, 37.7425],
    content: {
      title: 'Water Treatment Plant',
      tagline: {
        k2: 'Making dirty water clean again!',
        grades35: 'Where used water gets a second chance!',
        grades68: 'Advanced wastewater treatment protecting Bay water quality.',
      },
      description: {
        k2: 'Water treatment plants clean the water we use. They take out yucky stuff to keep fish and birds safe!',
        grades35: 'Water treatment plants clean the water we use in our homes before returning it to the Bay. They remove harmful stuff to keep the water and wildlife safe.',
        grades68: 'Modern wastewater treatment employs primary, secondary, and sometimes tertiary processes to remove suspended solids, organic matter, and nutrients before effluent discharge.',
      },
      whyItMatters: {
        k2: 'Without treatment plants, dirty water would hurt fish and birds!',
        grades35: 'Without treatment plants, dirty water would flow into the Bay and harm fish, birds, and other animals.',
        grades68: 'Wastewater treatment prevents eutrophication, pathogen spread, and toxic accumulation in aquatic food webs.',
      },
      funFacts: [
        {
          k2: 'One treatment plant can clean water for a million people every day!',
          grades35: 'One treatment plant can clean enough water for a million people every single day!',
          grades68: 'The Southeast Plant processes 80 million gallons daily, serving 1.2 million residents.',
        },
        {
          k2: 'Tiny helpful bugs eat the bad stuff in the water!',
          grades35: 'Bacteria in the treatment tanks eat the waste in the water - they\'re nature\'s cleanup crew!',
          grades68: 'Activated sludge processes utilize diverse microbial communities to metabolize organic compounds.',
        },
      ],
      howItWorks: [
        {
          step: 1,
          title: 'Collection',
          description: {
            k2: 'Water from sinks, toilets, and drains flows through pipes to the plant.',
            grades35: 'Sewers collect wastewater from homes and businesses and carry it to the plant.',
            grades68: 'Combined sewer systems transport both wastewater and stormwater through the collection network.',
          },
        },
        {
          step: 2,
          title: 'Screening',
          description: {
            k2: 'Big filters catch trash, sticks, and other large items.',
            grades35: 'Bar screens and grit chambers remove large debris and sand.',
            grades68: 'Primary treatment includes screening, grit removal, and primary clarification.',
          },
        },
        {
          step: 3,
          title: 'Settling',
          description: {
            k2: 'Heavy particles sink to the bottom of big tanks.',
            grades35: 'In settling tanks, heavy particles sink and are removed as sludge.',
            grades68: 'Sedimentation removes 50-70% of suspended solids through gravitational settling.',
          },
        },
        {
          step: 4,
          title: 'Biological Treatment',
          description: {
            k2: 'Tiny helpful bacteria eat the bad stuff in the water.',
            grades35: 'Helpful bacteria digest organic waste, cleaning the water naturally.',
            grades68: 'Activated sludge processes utilize aerobic microorganisms to oxidize organic matter.',
          },
        },
        {
          step: 5,
          title: 'Disinfection & Release',
          description: {
            k2: 'Clean water flows safely back into the Bay!',
            grades35: 'After disinfection, clean water is released back into San Francisco Bay.',
            grades68: 'UV or chlorine disinfection precedes effluent discharge per NPDES permit requirements.',
          },
        },
      ],
      coralIntro: {
        k2: 'This place makes dirty water clean! It\'s like a giant washing machine!',
        grades35: 'Ever wonder where the water goes after you flush? Let me show you!',
        grades68: 'This facility represents critical infrastructure protecting our watershed.',
      },
      takeAction: {
        k2: 'Only flush toilet paper! No wipes or toys!',
        grades35: 'Never pour grease down the drain, and only flush toilet paper.',
        grades68: 'Reduce pharmaceutical disposal via drains and support infrastructure investment.',
      },
      principles: {
        primary: 'II',
        secondary: ['IV'],
        concepts: ['II-B', 'IV-C'],
      },
      standards: {
        k2: 'K-ESS3-3',
        grades35: '5-ESS3-1',
        grades68: 'MS-ESS3-3',
      },
    },
  },
  {
    id: 'recycling-center',
    name: 'Recycling Center',
    type: 'infrastructure',
    category: 'Recycling',
    icon: '♻️',
    color: '#66bb6a',
    coordinates: [-122.2711, 37.8044],
    content: {
      title: 'Recycling Center',
      tagline: {
        k2: 'Turning old stuff into new stuff!',
        grades35: 'Where trash gets a second life!',
        grades68: 'Material recovery facility supporting circular economy goals.',
      },
      description: {
        k2: 'Recycling centers sort bottles, paper, and cans so they can become new things!',
        grades35: 'Recycling centers sort and process materials like paper, plastic, and metal so they can be made into new products instead of going to landfills.',
        grades68: 'Material recovery facilities use mechanical and manual sorting to separate recyclable commodities from the waste stream for remanufacturing.',
      },
      whyItMatters: {
        k2: 'Recycling means less trash and more new toys!',
        grades35: 'Recycling reduces trash, saves energy, and protects wildlife from pollution.',
        grades68: 'Recycling reduces extraction pressure on raw materials and decreases embodied energy in products.',
      },
      funFacts: [
        {
          k2: 'Recycling one can saves enough energy to run a TV for 3 hours!',
          grades35: 'Recycling one aluminum can saves enough energy to run a TV for 3 hours!',
          grades68: 'Aluminum recycling requires only 5% of the energy needed for primary production.',
        },
        {
          k2: 'Robots help sort recycling really fast!',
          grades35: 'Some recycling centers use robots with cameras to sort materials faster than humans!',
          grades68: 'AI-powered optical sorters can identify and sort 80+ material types at rates exceeding 100 items per minute.',
        },
      ],
      howItWorks: [
        {
          step: 1,
          title: 'Drop Off',
          description: {
            k2: 'People bring recyclables in trucks and cars.',
            grades35: 'Collection trucks bring recyclables from homes and businesses.',
            grades68: 'Single-stream collection aggregates commingled recyclables at the MRF.',
          },
        },
        {
          step: 2,
          title: 'Sorting',
          description: {
            k2: 'Machines and workers separate paper, plastic, glass, and metal.',
            grades35: 'Conveyor belts, magnets, and workers separate different materials.',
            grades68: 'Screens, eddy currents, optical sorters, and manual labor separate material streams.',
          },
        },
        {
          step: 3,
          title: 'Baling',
          description: {
            k2: 'Each material gets squished into big cubes called bales.',
            grades35: 'Sorted materials are compressed into dense bales for shipping.',
            grades68: 'Hydraulic balers compact materials to meet commodity specifications for domestic and export markets.',
          },
        },
        {
          step: 4,
          title: 'Shipping',
          description: {
            k2: 'Bales go to factories to become new products!',
            grades35: 'Bales are sold to manufacturers who turn them into new products.',
            grades68: 'Processed materials enter secondary commodity markets for remanufacturing.',
          },
        },
      ],
      coralIntro: {
        k2: 'Look! That bottle could become a new toy!',
        grades35: 'Every item here will become something new. That\'s the magic of recycling!',
        grades68: 'Material recovery is essential for sustainable resource management.',
      },
      takeAction: {
        k2: 'Put bottles and cans in the blue bin!',
        grades35: 'Rinse containers, flatten boxes, and keep recyclables dry.',
        grades68: 'Reduce contamination by understanding local recycling guidelines and advocating for extended producer responsibility.',
      },
      principles: {
        primary: 'IV',
        secondary: ['V'],
        concepts: ['IV-A', 'V-A'],
      },
      standards: {
        k2: 'K-ESS3-3',
        grades35: '5-ESS3-1',
        grades68: 'MS-ESS3-3',
      },
    },
  },
  {
    id: 'alviso-levee',
    name: 'Alviso Levee Trail',
    type: 'infrastructure',
    category: 'Flood Protection',
    icon: '🛡️',
    color: '#8d6e63',
    coordinates: [-121.9753, 37.4275],
    content: {
      title: 'Alviso Levee Trail',
      tagline: {
        k2: 'Walls that hold back the water!',
        grades35: 'Earthen barriers protecting the South Bay!',
        grades68: 'Flood control infrastructure facing sea level rise challenges.',
      },
      description: {
        k2: 'Levees are like big walls made of dirt and rock. They keep water from flooding neighborhoods!',
        grades35: 'Levees are like big walls made of dirt and rock that keep water from flooding neighborhoods. You can walk on top of them and see the Bay!',
        grades68: 'The Bay Area\'s levee system, much of it over a century old, protects critical infrastructure and communities from tidal flooding, but faces increasing strain from sea level rise.',
      },
      whyItMatters: {
        k2: 'Levees keep our homes and schools dry during storms!',
        grades35: 'As sea levels rise, levees protect homes, schools, and businesses from flooding.',
        grades68: 'Without levee upgrades, sea level rise could flood $100 billion in Bay Area assets by 2050.',
      },
      funFacts: [
        {
          k2: 'The Bay Area has over 100 miles of levees!',
          grades35: 'The Bay Area has over 100 miles of levees - that\'s longer than 1,500 football fields!',
          grades68: 'The San Francisco Bay has 430+ miles of shoreline, with levees protecting 60% of the developed waterfront.',
        },
        {
          k2: 'Plants help hold the dirt in place!',
          grades35: 'Native plants grow on levees to help hold the soil in place and prevent erosion.',
          grades68: 'Living shorelines combining engineered structures with native vegetation improve resilience while providing habitat.',
        },
      ],
      howItWorks: [
        {
          step: 1,
          title: 'Building',
          description: {
            k2: 'Workers pile up dirt and rocks in a long wall.',
            grades35: 'Engineers design levees using compacted earth, rock, and sometimes concrete.',
            grades68: 'Levee design considers soil mechanics, hydrostatic loads, and projected flood levels.',
          },
        },
        {
          step: 2,
          title: 'Vegetation',
          description: {
            k2: 'Plants are grown on the sides to hold the dirt in place.',
            grades35: 'Native plants are grown on the sides to prevent erosion and provide habitat.',
            grades68: 'Bioengineering integrates native vegetation for slope stabilization and ecological function.',
          },
        },
        {
          step: 3,
          title: 'Monitoring',
          description: {
            k2: 'Engineers check for cracks and weak spots.',
            grades35: 'Engineers regularly inspect for cracks, erosion, and animal burrows.',
            grades68: 'Levee inspection protocols assess seepage, settlement, slope stability, and structural integrity.',
          },
        },
        {
          step: 4,
          title: 'Protection',
          description: {
            k2: 'During storms and high tides, the levee keeps water out!',
            grades35: 'During king tides and storms, levees prevent flooding of nearby areas.',
            grades68: 'Levees provide deterministic flood protection up to their design capacity, beyond which overtopping occurs.',
          },
        },
      ],
      coralIntro: {
        k2: 'These dirt walls keep the water from flooding the town!',
        grades35: 'Walk along this levee and you\'re standing between the Bay and the city!',
        grades68: 'This infrastructure represents the front line of climate adaptation.',
      },
      takeAction: {
        k2: 'Don\'t dig or ride bikes on the levees!',
        grades35: 'Stay on trails and report any damage you see to park rangers.',
        grades68: 'Support levee maintenance funding and participate in sea level rise adaptation planning.',
      },
      principles: {
        primary: 'II',
        secondary: ['V'],
        concepts: ['II-C', 'V-A', 'V-B'],
      },
      standards: {
        k2: 'K-ESS3-3',
        grades35: '5-ESS3-1',
        grades68: 'MS-ESS3-3',
      },
    },
  },
];
