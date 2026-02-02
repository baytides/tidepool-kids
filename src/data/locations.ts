import { Location, QuizData } from '@/types';

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
      activity: {
        type: 'quiz',
        title: 'Tide Pool Quiz',
        instructions: {
          k2: 'Answer questions about tide pool animals!',
          grades35: 'Test your tide pool knowledge with this quiz!',
          grades68: 'Challenge yourself with questions about intertidal ecosystems.',
        },
        points: 20,
        badge: 'tide-pool-expert',
        data: {
          questions: [
            {
              question: {
                k2: 'What do hermit crabs live in?',
                grades35: 'Why do hermit crabs need to find new shells?',
                grades68: 'What is the term for the sequential shell exchange behavior of hermit crabs?',
              },
              options: [
                { k2: 'Empty shells', grades35: 'They grow bigger', grades68: 'Vacancy chain' },
                { k2: 'Sand holes', grades35: 'Their shell breaks', grades68: 'Symbiosis' },
                { k2: 'Seaweed', grades35: 'They get bored', grades68: 'Metamorphosis' },
                { k2: 'Rocks', grades35: 'They share with friends', grades68: 'Commensalism' },
              ],
              correctIndex: 0,
              explanation: {
                k2: 'Hermit crabs find empty shells to live in, like wearing a backpack home!',
                grades35: 'As hermit crabs grow larger, their shells become too small and they must find bigger ones.',
                grades68: 'Vacancy chains occur when multiple hermit crabs exchange shells in sequence, often triggered by the availability of a larger shell.',
              },
            },
            {
              question: {
                k2: 'How many arms does a sea star usually have?',
                grades35: 'What happens if a sea star loses an arm?',
                grades68: 'What cellular process allows sea stars to regenerate lost limbs?',
              },
              options: [
                { k2: 'Five', grades35: 'It grows back', grades68: 'Cellular dedifferentiation' },
                { k2: 'Two', grades35: 'It dies', grades68: 'Mitosis only' },
                { k2: 'Ten', grades35: 'Nothing', grades68: 'Meiosis' },
                { k2: 'Three', grades35: 'It falls off more', grades68: 'Apoptosis' },
              ],
              correctIndex: 0,
              explanation: {
                k2: 'Sea stars usually have five arms, and they can grow them back if they lose one!',
                grades35: 'Sea stars can regenerate lost arms, and some can even grow a whole new body from just one arm!',
                grades68: 'Regeneration in sea stars involves dedifferentiation, where specialized cells revert to stem-like states capable of forming any tissue type.',
              },
            },
            {
              question: {
                k2: 'What do sea anemones eat?',
                grades35: 'How do sea anemones catch their food?',
                grades68: 'What specialized cells do cnidarians use to capture prey?',
              },
              options: [
                { k2: 'Small fish', grades35: 'Stinging tentacles', grades68: 'Cnidocytes' },
                { k2: 'Seaweed', grades35: 'Chasing them', grades68: 'Erythrocytes' },
                { k2: 'Rocks', grades35: 'Asking nicely', grades68: 'Neurons' },
                { k2: 'Sand', grades35: 'With their feet', grades68: 'Osteocytes' },
              ],
              correctIndex: 0,
              explanation: {
                k2: 'Sea anemones eat small fish and shrimp that swim too close to their waving arms!',
                grades35: 'Sea anemones use stinging tentacles to paralyze small fish and shrimp that swim by.',
                grades68: 'Cnidocytes are specialized cells containing nematocysts - harpoon-like structures that fire neurotoxins to immobilize prey.',
              },
            },
          ],
        } as QuizData,
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
      activity: {
        type: 'quiz',
        title: 'Wetland Quiz',
        instructions: {
          k2: 'Answer questions about wetland birds!',
          grades35: 'Test your wetland knowledge!',
          grades68: 'Assess your understanding of wetland ecosystems.',
        },
        points: 20,
        badge: 'wetland-watcher',
        data: {
          questions: [
            {
              question: {
                k2: 'How far do some birds fly to visit here?',
                grades35: 'How far do migrating birds travel to Bay Area wetlands?',
                grades68: 'How many birds use the Pacific Flyway annually?',
              },
              options: [
                { k2: 'Super duper far!', grades35: 'Over 10,000 miles', grades68: 'Approximately 1 billion' },
                { k2: 'Just a little', grades35: '10 miles', grades68: 'About 1,000' },
                { k2: 'They don\'t fly', grades35: 'They don\'t migrate', grades68: 'Fewer than 100' },
                { k2: 'Around the block', grades35: '100 miles', grades68: 'About 1 million' },
              ],
              correctIndex: 0,
              explanation: {
                k2: 'Some birds fly more than 10,000 miles to visit Bay Area wetlands!',
                grades35: 'Migrating birds can travel over 10,000 miles along the Pacific Flyway to reach our wetlands.',
                grades68: 'The Pacific Flyway supports approximately 1 billion birds annually, with SF Bay providing critical stopover habitat.',
              },
            },
            {
              question: {
                k2: 'Why are wetlands like sponges?',
                grades35: 'Why are wetlands called "nature\'s sponges"?',
                grades68: 'What ecosystem service do wetlands provide regarding water?',
              },
              options: [
                { k2: 'They soak up water', grades35: 'They absorb flood water', grades68: 'Flood mitigation and water filtration' },
                { k2: 'They\'re yellow', grades35: 'They\'re soft', grades68: 'Carbon emission only' },
                { k2: 'They have holes', grades35: 'They smell funny', grades68: 'Heat generation' },
                { k2: 'They bounce', grades35: 'They float', grades68: 'Oxygen depletion' },
              ],
              correctIndex: 0,
              explanation: {
                k2: 'Wetlands soak up extra water like a sponge, which helps stop flooding!',
                grades35: 'Wetlands absorb excess water during storms and filter pollutants naturally.',
                grades68: 'Wetlands provide flood mitigation by storing excess water and biofiltering pollutants before they reach larger water bodies.',
              },
            },
            {
              question: {
                k2: 'How does the egret catch fish?',
                grades35: 'How do egrets hunt for fish?',
                grades68: 'What hunting strategy do egrets employ?',
              },
              options: [
                { k2: 'Standing very still', grades35: 'Stand-and-wait ambush', grades68: 'Sit-and-wait predation strategy' },
                { k2: 'Running fast', grades35: 'Chasing them', grades68: 'Active pursuit hunting' },
                { k2: 'Using a fishing rod', grades35: 'Using nets', grades68: 'Tool-assisted capture' },
                { k2: 'Asking nicely', grades35: 'Calling them', grades68: 'Acoustic luring' },
              ],
              correctIndex: 0,
              explanation: {
                k2: 'Egrets stand super still in the water, then snap up fish really fast!',
                grades35: 'Egrets use a stand-and-wait strategy, remaining motionless until prey comes within strike distance.',
                grades68: 'Egrets employ sit-and-wait predation, with strike speeds under 0.05 seconds and success rates 300% higher than active foraging.',
              },
            },
          ],
        } as QuizData,
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
  {
    id: 'muir-woods',
    name: 'Muir Woods',
    type: 'habitat',
    category: 'Forest',
    icon: '🌲',
    color: '#2e7d32',
    coordinates: [-122.5697, 37.8912],
    content: {
      title: 'Muir Woods',
      tagline: {
        k2: 'Trees taller than buildings!',
        grades35: 'Walk among ancient giants!',
        grades68: 'An old-growth coastal redwood forest ecosystem.',
      },
      description: {
        k2: 'These trees are SO tall! Some have been growing for 1,000 years!',
        grades35: 'Coast redwoods are the tallest living things on Earth. This forest has trees over 250 feet tall!',
        grades68: 'Sequoia sempervirens in Muir Woods represent remnant old-growth forest, with individual trees exceeding 1,000 years of age.',
      },
      whyItMatters: {
        k2: 'Big trees clean our air and give animals homes!',
        grades35: 'Old forests store carbon, clean the air, and provide habitat for thousands of species.',
        grades68: 'Old-growth redwoods store more carbon per hectare than any other ecosystem and harvest fog to sustain summer water flow.',
      },
      funFacts: [
        {
          k2: 'Redwoods drink water from fog with their needles!',
          grades35: 'Redwood trees can "drink" fog through their leaves - they don\'t just use their roots!',
          grades68: 'Fog drip contributes up to 40% of redwood water intake during dry summer months via foliar uptake.',
        },
        {
          k2: 'A salamander lives only in these forests!',
          grades35: 'The clouded salamander lives its whole life up in the redwood branches!',
          grades68: 'Arboreal salamanders complete their entire life cycle in the canopy, never touching the forest floor.',
        },
      ],
      creatures: [
        {
          id: 'banana-slug',
          name: 'Banana Slug',
          emoji: '🐌',
          fact: {
            k2: 'They eat dead leaves to help the forest!',
            grades35: 'Banana slugs are nature\'s recyclers - they eat dead plants and turn them into soil nutrients.',
            grades68: 'Ariolimax columbianus accelerates decomposition, playing a crucial role in forest nutrient cycling.',
          },
        },
        {
          id: 'spotted-owl',
          name: 'Northern Spotted Owl',
          emoji: '🦉',
          fact: {
            k2: 'They hunt at night and sleep in the day!',
            grades35: 'Spotted owls need old forests with big trees to build their nests.',
            grades68: 'Strix occidentalis caurina is a threatened species that requires late-successional forest habitat.',
          },
        },
        {
          id: 'coast-redwood',
          name: 'Coast Redwood',
          emoji: '🌲',
          fact: {
            k2: 'Some trees here are older than castles!',
            grades35: 'Coast redwoods can live over 2,000 years and grow 350+ feet tall!',
            grades68: 'Sequoia sempervirens achieves maximum heights through hydraulic limits and fog-water supplementation.',
          },
        },
      ],
      coralIntro: {
        k2: 'Look UP! These trees are like giant green skyscrapers!',
        grades35: 'These trees were here before Columbus sailed to America!',
        grades68: 'This remnant old-growth forest contains irreplaceable genetic diversity.',
      },
      takeAction: {
        k2: 'Stay on the trail so we don\'t hurt the tree roots!',
        grades35: 'Stick to boardwalks and trails - redwood roots are shallow and easily damaged.',
        grades68: 'Support land trusts acquiring and protecting remaining old-growth stands.',
      },
      principles: {
        primary: 'I',
        secondary: ['III', 'IV'],
        concepts: ['I-A', 'I-B', 'III-B', 'IV-A'],
      },
      standards: {
        k2: 'K-ESS3-3',
        grades35: '5-ESS3-1',
        grades68: 'MS-ESS3-3',
      },
      activity: {
        type: 'quiz',
        title: 'Redwood Forest Quiz',
        instructions: {
          k2: 'Answer questions about the big trees!',
          grades35: 'Test your redwood knowledge!',
          grades68: 'Challenge yourself with questions about old-growth ecosystems.',
        },
        points: 20,
        badge: 'forest-ranger',
        data: {
          questions: [
            {
              question: {
                k2: 'How do redwood trees drink fog?',
                grades35: 'How do redwoods get water from fog?',
                grades68: 'What percentage of redwood water intake can come from fog?',
              },
              options: [
                { k2: 'Through their needles', grades35: 'Through their leaves', grades68: 'Up to 40%' },
                { k2: 'With a straw', grades35: 'By flying up', grades68: 'Less than 5%' },
                { k2: 'They don\'t', grades35: 'They can\'t', grades68: 'Exactly 100%' },
                { k2: 'Through their bark', grades35: 'Through their trunk', grades68: 'About 80%' },
              ],
              correctIndex: 0,
              explanation: {
                k2: 'Redwoods can drink water right through their needles when fog rolls in!',
                grades35: 'Redwood trees can absorb water through their leaves - fog drip provides water during dry summers.',
                grades68: 'Fog drip can contribute up to 40% of water intake during summer months via foliar uptake through stomata.',
              },
            },
            {
              question: {
                k2: 'What does the banana slug eat?',
                grades35: 'Why are banana slugs important for the forest?',
                grades68: 'What ecological role do banana slugs play in redwood forests?',
              },
              options: [
                { k2: 'Dead leaves', grades35: 'They recycle dead plants', grades68: 'Decomposer accelerating nutrient cycling' },
                { k2: 'Bananas', grades35: 'They eat trees', grades68: 'Primary producer' },
                { k2: 'Other slugs', grades35: 'They make oxygen', grades68: 'Apex predator' },
                { k2: 'Bugs', grades35: 'They plant seeds', grades68: 'Nitrogen fixer' },
              ],
              correctIndex: 0,
              explanation: {
                k2: 'Banana slugs eat dead leaves and plants, turning them into food for the soil!',
                grades35: 'Banana slugs are nature\'s recyclers - they break down dead plants into nutrients the trees can use.',
                grades68: 'As decomposers, banana slugs accelerate nutrient cycling by breaking down organic matter and making nutrients available to plants.',
              },
            },
            {
              question: {
                k2: 'How old can redwood trees be?',
                grades35: 'How long can coast redwoods live?',
                grades68: 'What is the approximate maximum age of Sequoia sempervirens?',
              },
              options: [
                { k2: 'Over 1,000 years', grades35: 'Over 2,000 years', grades68: 'Over 2,000 years' },
                { k2: '10 years', grades35: '100 years', grades68: '500 years maximum' },
                { k2: '50 years', grades35: '500 years', grades68: '100 years maximum' },
                { k2: '100 years', grades35: '50 years', grades68: '50 years maximum' },
              ],
              correctIndex: 0,
              explanation: {
                k2: 'Some redwood trees have been growing for over 1,000 years - older than any castle!',
                grades35: 'Coast redwoods can live more than 2,000 years, making them among the oldest living things on Earth.',
                grades68: 'Individual Sequoia sempervirens specimens have been dated to over 2,000 years old through ring counting and radiocarbon dating.',
              },
            },
          ],
        } as QuizData,
      },
    },
  },
  {
    id: 'redwood-regional',
    name: 'Redwood Regional Park',
    type: 'habitat',
    category: 'Forest',
    icon: '🦎',
    color: '#558b2f',
    coordinates: [-122.1638, 37.8160],
    content: {
      title: 'Redwood Regional Park',
      tagline: {
        k2: 'Baby redwoods growing up!',
        grades35: 'A second-chance forest in the East Bay!',
        grades68: 'A regenerated redwood forest demonstrating ecological resilience.',
      },
      description: {
        k2: 'These redwood trees are growing back after people cut down the old ones long ago.',
        grades35: 'This forest was completely logged 150 years ago, but redwoods can sprout from stumps! The forest grew back.',
        grades68: 'This second-growth forest demonstrates redwood resilience; logged in the 1850s, it regenerated from stump sprouts and now supports diverse wildlife.',
      },
      whyItMatters: {
        k2: 'Forests can grow back if we give them a chance!',
        grades35: 'This forest proves that damaged ecosystems can recover. It gives us hope for the future!',
        grades68: 'Second-growth forests sequester carbon rapidly and can develop old-growth characteristics within 200-300 years.',
      },
      funFacts: [
        {
          k2: 'These trees grew from the stumps of the old trees!',
          grades35: 'When redwoods are cut down, new trees can sprout right from the stump!',
          grades68: 'Redwood basal burls contain dormant buds that activate after disturbance, enabling vegetative reproduction.',
        },
        {
          k2: 'Rainbow trout swim in the streams here!',
          grades35: 'Redwood Creek has steelhead trout that swim all the way from the ocean!',
          grades68: 'Anadromous steelhead use Redwood Creek as spawning habitat, benefiting from shade and stable water temperatures.',
        },
      ],
      creatures: [
        {
          id: 'steelhead-trout',
          name: 'Steelhead Trout',
          emoji: '🐟',
          fact: {
            k2: 'They swim from the ocean to have babies in streams!',
            grades35: 'Steelhead trout are born in streams, swim to the ocean, then return to have their own babies.',
            grades68: 'Oncorhynchus mykiss irideus exhibits anadromous life history, with individuals returning to natal streams via olfactory imprinting.',
          },
        },
        {
          id: 'california-newt',
          name: 'California Newt',
          emoji: '🦎',
          fact: {
            k2: 'Their orange belly warns "Don\'t eat me!"',
            grades35: 'California newts are poisonous! Their bright orange belly warns predators to stay away.',
            grades68: 'Taricha torosa produces tetrodotoxin, with toxicity levels varying geographically in response to garter snake predation pressure.',
          },
        },
      ],
      coralIntro: {
        k2: 'This whole forest grew back from stumps! Nature is amazing!',
        grades35: 'People cut down all the old trees, but look - the forest came back!',
        grades68: 'This regenerated ecosystem demonstrates remarkable ecological resilience.',
      },
      takeAction: {
        k2: 'Don\'t pick the mushrooms or flowers!',
        grades35: 'Leave plants, mushrooms, and animals where you find them.',
        grades68: 'Volunteer for habitat restoration projects and support watershed protection efforts.',
      },
      principles: {
        primary: 'III',
        secondary: ['I'],
        concepts: ['III-A', 'III-B', 'I-B'],
      },
      standards: {
        k2: 'K-ESS3-3',
        grades35: '5-ESS3-1',
        grades68: 'MS-ESS3-3',
      },
    },
  },
  {
    id: 'aquarium-of-bay',
    name: 'Aquarium of the Bay',
    type: 'habitat',
    category: 'Aquarium',
    icon: '🐠',
    color: '#0288d1',
    coordinates: [-122.4117, 37.8087],
    content: {
      title: 'Aquarium of the Bay',
      tagline: {
        k2: 'Sharks swimming over your head!',
        grades35: 'Walk through tunnels surrounded by Bay creatures!',
        grades68: 'An immersive exhibit showcasing San Francisco Bay biodiversity.',
      },
      description: {
        k2: 'Walk through clear tunnels while fish and sharks swim all around you!',
        grades35: 'This aquarium focuses on animals that live right here in San Francisco Bay. You can walk through 300-foot tunnels surrounded by sharks, rays, and fish!',
        grades68: 'Dedicated exclusively to local aquatic life, this facility maintains living exhibits of over 200 species native to the San Francisco Bay watershed.',
      },
      whyItMatters: {
        k2: 'The aquarium teaches us about our Bay friends!',
        grades35: 'Learning about Bay animals helps us understand why we need to protect their home.',
        grades68: 'Public aquariums drive conservation awareness and support research on local species populations and threats.',
      },
      funFacts: [
        {
          k2: 'Sevengill sharks can be 9 feet long!',
          grades35: 'The aquarium has sevengill sharks that grow up to 9 feet - they\'ve lived here for millions of years!',
          grades68: 'Notorynchus cepedianus is a living fossil; the species has remained largely unchanged for 190 million years.',
        },
        {
          k2: 'Bat rays flap their fins like birds fly!',
          grades35: 'Bat rays "fly" through the water by flapping their fins like wings!',
          grades68: 'Myliobatis californica uses oscillatory locomotion, with pectoral fin kinematics analogous to avian flight.',
        },
      ],
      creatures: [
        {
          id: 'sevengill-shark',
          name: 'Sevengill Shark',
          emoji: '🦈',
          fact: {
            k2: 'They have 7 gills instead of 5 like most sharks!',
            grades35: 'Sevengill sharks have an extra pair of gills. They\'re one of the oldest shark species alive!',
            grades68: 'Sevengill sharks retain primitive characteristics including seven gill slits and lack a dorsal spine.',
          },
        },
        {
          id: 'bat-ray',
          name: 'Bat Ray',
          emoji: '🐟',
          fact: {
            k2: 'You can touch them in the touch pool!',
            grades35: 'Bat rays are gentle and curious - they often approach divers!',
            grades68: 'Bat rays use electroreception to detect buried invertebrate prey in sandy substrates.',
          },
        },
        {
          id: 'leopard-shark',
          name: 'Leopard Shark',
          emoji: '🦈',
          fact: {
            k2: 'They have cool spots like a leopard!',
            grades35: 'Leopard sharks have beautiful spotted patterns that help them blend into the sandy bottom.',
            grades68: 'Triakis semifasciata is the most common nearshore shark in California, with females aggregating in warm shallow waters.',
          },
        },
      ],
      coralIntro: {
        k2: 'Wow! Look at all the fish swimming above us!',
        grades35: 'These are all animals that live in our Bay! Let\'s learn about them!',
        grades68: 'This facility specializes in local species conservation and education.',
      },
      takeAction: {
        k2: 'Don\'t tap on the glass - it scares the fish!',
        grades35: 'Be quiet and respectful - loud noises stress aquarium animals.',
        grades68: 'Support sustainable seafood choices and organizations protecting Bay habitats.',
      },
      principles: {
        primary: 'I',
        secondary: ['V'],
        concepts: ['I-A', 'I-B', 'V-A', 'V-B'],
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
      activity: {
        type: 'quiz',
        title: 'Water Treatment Quiz',
        instructions: {
          k2: 'Learn how we clean water!',
          grades35: 'Test what you know about water treatment!',
          grades68: 'Assess your knowledge of wastewater treatment processes.',
        },
        points: 20,
        badge: 'water-wizard',
        data: {
          questions: [
            {
              question: {
                k2: 'What eats the bad stuff in water treatment?',
                grades35: 'What helps clean the water in treatment plants?',
                grades68: 'What type of organisms are used in activated sludge processes?',
              },
              options: [
                { k2: 'Tiny bacteria', grades35: 'Helpful bacteria', grades68: 'Aerobic microorganisms' },
                { k2: 'Fish', grades35: 'Big fish', grades68: 'Anaerobic fish' },
                { k2: 'Birds', grades35: 'Cleaning robots', grades68: 'Photosynthetic algae only' },
                { k2: 'Dolphins', grades35: 'Magic crystals', grades68: 'Viral particles' },
              ],
              correctIndex: 0,
              explanation: {
                k2: 'Tiny helpful bacteria eat the yucky stuff in water to make it clean!',
                grades35: 'Bacteria in treatment tanks digest waste naturally - they\'re nature\'s cleanup crew!',
                grades68: 'Activated sludge processes use diverse aerobic microbial communities to metabolize organic compounds through oxidation.',
              },
            },
            {
              question: {
                k2: 'Where does the clean water go after treatment?',
                grades35: 'What happens to water after it\'s treated?',
                grades68: 'What permit governs treated wastewater discharge?',
              },
              options: [
                { k2: 'Back to the Bay', grades35: 'Released to the Bay', grades68: 'NPDES permit' },
                { k2: 'Up to the clouds', grades35: 'Sent to space', grades68: 'FDA approval' },
                { k2: 'Into the ground', grades35: 'Bottled and sold', grades68: 'OSHA permit' },
                { k2: 'To the mountains', grades35: 'Frozen into ice', grades68: 'EPA waiver' },
              ],
              correctIndex: 0,
              explanation: {
                k2: 'After we clean the water, it flows safely back into San Francisco Bay!',
                grades35: 'Treated water is released back into the Bay where it\'s safe for fish and wildlife.',
                grades68: 'The National Pollutant Discharge Elimination System (NPDES) permit sets strict standards for effluent quality.',
              },
            },
            {
              question: {
                k2: 'What should we NOT flush down the toilet?',
                grades35: 'What causes problems for treatment plants?',
                grades68: 'What items should never enter the sewer system?',
              },
              options: [
                { k2: 'Wipes and toys', grades35: 'Wipes and grease', grades68: 'Non-biodegradable materials and FOG' },
                { k2: 'Water', grades35: 'Toilet paper', grades68: 'Human waste only' },
                { k2: 'Toilet paper', grades35: 'Water', grades68: 'Biodegradable soap' },
                { k2: 'Nothing bad', grades35: 'Nothing', grades68: 'Dilute solutions' },
              ],
              correctIndex: 0,
              explanation: {
                k2: 'Only flush toilet paper! Wipes and toys can clog the pipes.',
                grades35: 'Wipes, grease, and other items can clog pipes and damage treatment equipment.',
                grades68: 'FOG (fats, oils, grease) and non-biodegradable materials cause blockages and equipment damage, requiring costly remediation.',
              },
            },
          ],
        } as QuizData,
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
      activity: {
        type: 'quiz',
        title: 'Recycling Quiz',
        instructions: {
          k2: 'Learn about recycling!',
          grades35: 'Test your recycling knowledge!',
          grades68: 'Assess your understanding of material recovery processes.',
        },
        points: 20,
        badge: 'recycling-hero',
        data: {
          questions: [
            {
              question: {
                k2: 'Recycling one can saves enough energy to...',
                grades35: 'How much energy does recycling aluminum save?',
                grades68: 'What percentage of energy is saved by recycling aluminum vs. primary production?',
              },
              options: [
                { k2: 'Run a TV for 3 hours', grades35: '95% of the energy', grades68: '95% (requires only 5% of primary energy)' },
                { k2: 'Nothing', grades35: '10% of the energy', grades68: '10%' },
                { k2: 'Light a candle', grades35: '50% of the energy', grades68: '50%' },
                { k2: 'Heat a pool', grades35: 'No energy saved', grades68: '0% (no savings)' },
              ],
              correctIndex: 0,
              explanation: {
                k2: 'Recycling just one aluminum can saves enough energy to run your TV for 3 hours!',
                grades35: 'Recycling aluminum saves 95% of the energy needed to make new aluminum from raw materials.',
                grades68: 'Aluminum recycling requires only 5% of the energy needed for primary production from bauxite ore.',
              },
            },
            {
              question: {
                k2: 'What helps sort recycling really fast?',
                grades35: 'What technology helps sort recyclables?',
                grades68: 'What technology enables high-speed material identification in MRFs?',
              },
              options: [
                { k2: 'Robots with cameras', grades35: 'AI-powered optical sorters', grades68: 'Near-infrared optical sorters' },
                { k2: 'Magic', grades35: 'Magic wands', grades68: 'Manual sorting only' },
                { k2: 'Wizards', grades35: 'X-ray vision', grades68: 'Magnetic separation only' },
                { k2: 'Elves', grades35: 'Sound waves', grades68: 'Gravity separation only' },
              ],
              correctIndex: 0,
              explanation: {
                k2: 'Smart robots with cameras can sort recycling faster than people!',
                grades35: 'AI-powered robots use cameras and machine learning to identify and sort materials at high speed.',
                grades68: 'Near-infrared optical sorters identify material composition spectroscopically, enabling automated sorting of 80+ material types.',
              },
            },
            {
              question: {
                k2: 'What happens to recycled bottles?',
                grades35: 'Where do baled recyclables go?',
                grades68: 'What is the destination for processed recyclable commodities?',
              },
              options: [
                { k2: 'They become new things', grades35: 'To manufacturers for new products', grades68: 'Secondary commodity markets' },
                { k2: 'They disappear', grades35: 'To the dump', grades68: 'Primary landfills' },
                { k2: 'They go to space', grades35: 'To the ocean', grades68: 'Ocean disposal' },
                { k2: 'Nothing', grades35: 'They stay forever', grades68: 'Indefinite storage' },
              ],
              correctIndex: 0,
              explanation: {
                k2: 'Recycled bottles and cans become new products like toys, clothes, and more bottles!',
                grades35: 'Baled recyclables are sold to manufacturers who turn them into new products.',
                grades68: 'Processed materials enter secondary commodity markets where they are purchased by manufacturers for reprocessing.',
              },
            },
          ],
        } as QuizData,
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
  {
    id: 'hetch-hetchy',
    name: 'Hetch Hetchy Reservoir',
    type: 'infrastructure',
    category: 'Water Supply',
    icon: '🏔️',
    color: '#0277bd',
    coordinates: [-119.7871, 37.9485],
    content: {
      title: 'Hetch Hetchy Reservoir',
      tagline: {
        k2: 'Mountain water for the city!',
        grades35: 'Where SF\'s drinking water comes from!',
        grades68: 'A gravity-fed water supply system from Yosemite.',
      },
      description: {
        k2: 'Water from snowy mountains flows all the way to San Francisco!',
        grades35: 'San Francisco\'s drinking water comes from snowmelt in Yosemite, traveling 167 miles through pipes to reach your tap!',
        grades68: 'The Hetch Hetchy system delivers 265 million gallons daily via gravity, requiring no chemical treatment due to watershed protection.',
      },
      whyItMatters: {
        k2: 'Clean mountain water keeps us healthy!',
        grades35: 'Protecting the mountain forests keeps our water clean. It\'s nature\'s own water filter!',
        grades68: 'Watershed protection eliminates filtration requirements, demonstrating the economic value of natural capital.',
      },
      funFacts: [
        {
          k2: 'The water travels in pipes for 167 miles!',
          grades35: 'Water from Hetch Hetchy takes 1-2 days to reach your tap, traveling through tunnels drilled through mountains!',
          grades68: 'The system includes 170 miles of tunnels, some bored through solid granite at elevations exceeding 7,000 feet.',
        },
        {
          k2: 'SF water is so clean it doesn\'t need filtering!',
          grades35: 'SF is one of only a few cities that doesn\'t need to filter its drinking water - it\'s that clean!',
          grades68: 'San Francisco holds one of only 5 US unfiltered surface water supplies, relying on UV disinfection alone.',
        },
      ],
      howItWorks: [
        {
          step: 1,
          title: 'Snow Falls',
          description: {
            k2: 'Snow falls on the mountains and melts in spring.',
            grades35: 'Winter snow in the Sierra Nevada melts and fills the reservoir.',
            grades68: 'Snowpack serves as natural storage, with spring melt filling the 360,000 acre-foot reservoir.',
          },
        },
        {
          step: 2,
          title: 'Gravity Flow',
          description: {
            k2: 'Water flows downhill through big pipes.',
            grades35: 'Water flows downhill through tunnels and pipes - no pumps needed!',
            grades68: 'Gravity conveyance eliminates pumping energy costs, with system head exceeding 1,000 feet.',
          },
        },
        {
          step: 3,
          title: 'UV Treatment',
          description: {
            k2: 'Special lights kill any tiny germs.',
            grades35: 'UV light zaps any remaining germs before the water reaches your home.',
            grades68: 'Ultraviolet disinfection achieves 4-log inactivation of Cryptosporidium without chemical residuals.',
          },
        },
        {
          step: 4,
          title: 'To Your Tap',
          description: {
            k2: 'Clean water comes out when you turn on the faucet!',
            grades35: 'The water arrives at local reservoirs and then to your home.',
            grades68: 'Terminal reservoirs buffer demand fluctuations before distribution to 2.7 million customers.',
          },
        },
      ],
      coralIntro: {
        k2: 'Your water comes from real mountains with snow!',
        grades35: 'Every glass of water you drink came from mountains 167 miles away!',
        grades68: 'This gravity-fed system demonstrates sustainable water infrastructure design.',
      },
      takeAction: {
        k2: 'Turn off the water while brushing your teeth!',
        grades35: 'Take shorter showers and fix dripping faucets to save water.',
        grades68: 'Support watershed protection policies and water conservation programs.',
      },
      principles: {
        primary: 'II',
        secondary: ['III'],
        concepts: ['II-A', 'II-B', 'III-A'],
      },
      standards: {
        k2: 'K-ESS3-3',
        grades35: '5-ESS3-1',
        grades68: 'MS-ESS3-3',
      },
    },
  },
  {
    id: 'sf-compost',
    name: 'SF Compost Facility',
    type: 'infrastructure',
    category: 'Composting',
    icon: '🪱',
    color: '#6d4c41',
    coordinates: [-122.3836, 37.5072],
    content: {
      title: 'SF Compost Facility',
      tagline: {
        k2: 'Turning banana peels into garden gold!',
        grades35: 'Where food scraps become super soil!',
        grades68: 'Large-scale organics processing for municipal composting.',
      },
      description: {
        k2: 'Your food scraps go here and become food for plants!',
        grades35: 'San Francisco\'s food scraps and yard waste come here to become compost - rich soil that helps plants grow.',
        grades68: 'This facility processes 400+ tons of organics daily using aerated static pile composting, diverting material from landfills.',
      },
      whyItMatters: {
        k2: 'Composting means less smelly trash and happy gardens!',
        grades35: 'Composting keeps food waste out of landfills where it would create harmful gases.',
        grades68: 'Organics diversion reduces methane emissions (25x more potent than CO2) while producing valuable soil amendments.',
      },
      funFacts: [
        {
          k2: 'The compost gets really hot - like a fever!',
          grades35: 'Compost piles can reach 160°F - hot enough to kill weed seeds and germs!',
          grades68: 'Thermophilic decomposition reaches 65°C, exceeding pathogen reduction requirements.',
        },
        {
          k2: 'Tiny bugs and worms do all the work!',
          grades35: 'Billions of tiny organisms - bacteria, fungi, and worms - do the work of turning scraps into soil.',
          grades68: 'Microbial communities drive decomposition, with bacterial populations exceeding 10 billion per gram.',
        },
      ],
      howItWorks: [
        {
          step: 1,
          title: 'Collection',
          description: {
            k2: 'Green bins get picked up by trucks.',
            grades35: 'Trucks collect green bins from homes and businesses across the city.',
            grades68: 'Source-separated organics are collected via dedicated fleet and delivered for processing.',
          },
        },
        {
          step: 2,
          title: 'Grinding',
          description: {
            k2: 'Big machines chop everything into small pieces.',
            grades35: 'Giant grinders break down the material into small, even pieces.',
            grades68: 'Mechanical processing achieves particle size reduction for optimal microbial access.',
          },
        },
        {
          step: 3,
          title: 'Composting',
          description: {
            k2: 'The pile gets warm and the scraps turn into dirt.',
            grades35: 'Material is arranged in large piles where heat and microbes transform it.',
            grades68: 'Aerated static pile composting maintains aerobic conditions for 45+ days.',
          },
        },
        {
          step: 4,
          title: 'Curing & Screening',
          description: {
            k2: 'Finished compost is sifted and bagged.',
            grades35: 'The finished compost is screened to remove any remaining large pieces.',
            grades68: 'Cured material is screened to particle size specifications for various agricultural uses.',
          },
        },
      ],
      coralIntro: {
        k2: 'Your banana peels become food for tomatoes!',
        grades35: 'What happens to your food scraps? Let\'s find out!',
        grades68: 'This facility represents cutting-edge urban organics management.',
      },
      takeAction: {
        k2: 'Put food scraps in the green bin, not the trash!',
        grades35: 'Learn what goes in the green bin and help your family compost correctly.',
        grades68: 'Advocate for expanded organics collection and support community composting initiatives.',
      },
      principles: {
        primary: 'IV',
        secondary: ['II'],
        concepts: ['IV-A', 'IV-B', 'II-B'],
      },
      standards: {
        k2: 'K-ESS3-3',
        grades35: '5-ESS3-1',
        grades68: 'MS-ESS3-3',
      },
    },
  },
  {
    id: 'embarcadero-bart',
    name: 'Embarcadero BART',
    type: 'infrastructure',
    category: 'Transit',
    icon: '🚇',
    color: '#1565c0',
    coordinates: [-122.3969, 37.7929],
    content: {
      title: 'Embarcadero BART Station',
      tagline: {
        k2: 'Underground trains that zoom really fast!',
        grades35: 'Trains that run under the Bay!',
        grades68: 'Mass transit reducing regional carbon emissions.',
      },
      description: {
        k2: 'BART trains carry people under the water in a special tunnel!',
        grades35: 'BART trains travel through a tube on the bottom of San Francisco Bay! It\'s one of the longest underwater tunnels in the world.',
        grades68: 'BART\'s transbay tube spans 3.6 miles beneath the Bay, transporting 400,000+ daily riders on one of the world\'s longest immersed tubes.',
      },
      whyItMatters: {
        k2: 'Trains help keep the air clean by giving people rides!',
        grades35: 'When people take BART instead of driving, there\'s less pollution and traffic.',
        grades68: 'Each BART trip displaces an average car journey, reducing per-capita transportation emissions by 40% for riders.',
      },
      funFacts: [
        {
          k2: 'The train goes 30 feet under the water!',
          grades35: 'The transbay tube sits in a trench 135 feet below the water\'s surface!',
          grades68: 'The tube was assembled from 57 prefabricated sections lowered into a dredged trench and joined underwater.',
        },
        {
          k2: 'Electric trains don\'t need gasoline!',
          grades35: 'BART trains are electric - they get power from a third rail and produce zero exhaust!',
          grades68: 'BART fleet electrification powered by 100% renewable energy eliminates direct tailpipe emissions.',
        },
      ],
      howItWorks: [
        {
          step: 1,
          title: 'Electric Power',
          description: {
            k2: 'Trains get electricity from a special rail.',
            grades35: 'A third rail beside the track provides 1,000 volts of electricity.',
            grades68: 'Third-rail DC traction power at 1,000V feeds motors in each car.',
          },
        },
        {
          step: 2,
          title: 'The Tube',
          description: {
            k2: 'The train goes through a tube under the water.',
            grades35: 'The transbay tube is a sealed tunnel resting on the Bay floor.',
            grades68: 'Immersed tube construction placed 57 sections in a dredged trench, with seismic joints allowing movement.',
          },
        },
        {
          step: 3,
          title: 'Safety Systems',
          description: {
            k2: 'Computers help keep the trains safe.',
            grades35: 'Automatic systems control train spacing and speed for safety.',
            grades68: 'ATC (Automatic Train Control) maintains safe headways and emergency ventilation systems provide egress capacity.',
          },
        },
        {
          step: 4,
          title: 'Moving People',
          description: {
            k2: 'Lots of people ride instead of driving cars.',
            grades35: 'Thousands of people ride every hour, keeping cars off the roads.',
            grades68: 'Peak capacity exceeds 25,000 passengers per hour per direction, equivalent to 12 freeway lanes.',
          },
        },
      ],
      coralIntro: {
        k2: 'Whoosh! This train goes under the Bay!',
        grades35: 'Taking the train helps keep our air clean!',
        grades68: 'Public transit is essential infrastructure for sustainable cities.',
      },
      takeAction: {
        k2: 'Take BART on your next adventure!',
        grades35: 'Encourage your family to try public transit for trips into the city.',
        grades68: 'Advocate for transit investment and support transit-oriented development policies.',
      },
      principles: {
        primary: 'II',
        secondary: ['V'],
        concepts: ['II-B', 'V-A', 'V-B'],
      },
      standards: {
        k2: 'K-ESS3-3',
        grades35: '5-ESS3-1',
        grades68: 'MS-ESS3-3',
      },
    },
  },
  {
    id: 'bay-bridge',
    name: 'SF-Oakland Bay Bridge',
    type: 'infrastructure',
    category: 'Transportation',
    icon: '🌉',
    color: '#546e7a',
    coordinates: [-122.3778, 37.7983],
    content: {
      title: 'SF-Oakland Bay Bridge',
      tagline: {
        k2: 'A bridge that crosses the whole Bay!',
        grades35: 'Engineering marvel connecting two cities!',
        grades68: 'Seismically retrofitted critical transportation infrastructure.',
      },
      description: {
        k2: 'This super long bridge goes all the way across San Francisco Bay!',
        grades35: 'The Bay Bridge is actually two bridges connected at Yerba Buena Island. The new eastern span was built to survive earthquakes!',
        grades68: 'The 4.5-mile crossing combines the original 1936 suspension span with a 2013 self-anchored suspension replacement engineered for major seismic events.',
      },
      whyItMatters: {
        k2: 'The bridge helps people get to work and school!',
        grades35: 'The bridge connects the East Bay to San Francisco - 250,000 vehicles cross every day!',
        grades68: 'Critical infrastructure resilience ensures economic continuity; the 1989 Loma Prieta earthquake demonstrated seismic vulnerability.',
      },
      funFacts: [
        {
          k2: 'The bridge is taller than most buildings!',
          grades35: 'The tower of the new eastern span is 525 feet tall - taller than the Statue of Liberty!',
          grades68: 'The new east span\'s 525-foot tower supports the world\'s largest self-anchored suspension span at 2,047 feet.',
        },
        {
          k2: 'The bridge lights can change colors!',
          grades35: 'The Bay Lights art installation uses 25,000 LED lights that can create moving patterns!',
          grades68: 'The Bay Lights installation, with 25,000 LEDs spanning 1.8 miles, became permanent public art after initial success.',
        },
      ],
      howItWorks: [
        {
          step: 1,
          title: 'Foundation',
          description: {
            k2: 'Big posts go deep into the ground under the water.',
            grades35: 'Huge pilings are driven into the Bay floor to support the bridge.',
            grades68: 'Foundation piles extend up to 300 feet through Bay mud to reach bedrock.',
          },
        },
        {
          step: 2,
          title: 'Towers & Cables',
          description: {
            k2: 'Strong towers hold up cables that hold up the road.',
            grades35: 'Massive towers support cables that hold up the roadway deck.',
            grades68: 'The main cable comprises 17,399 strands of high-strength steel wire.',
          },
        },
        {
          step: 3,
          title: 'Seismic Safety',
          description: {
            k2: 'Special parts let the bridge wiggle safely in earthquakes.',
            grades35: 'The bridge can flex and move during earthquakes without breaking.',
            grades68: 'Seismic isolation bearings and hinge pipe beams accommodate 6+ feet of differential movement.',
          },
        },
        {
          step: 4,
          title: 'Traffic Flow',
          description: {
            k2: 'Cars and bikes cross safely every day.',
            grades35: 'The bridge has lanes for cars plus a bike path on the new span.',
            grades68: 'Ten traffic lanes plus a pedestrian/cycling path accommodate 250,000+ daily crossings.',
          },
        },
      ],
      coralIntro: {
        k2: 'Look how long this bridge is! It goes all the way across!',
        grades35: 'This bridge was rebuilt to survive earthquakes. Smart engineering!',
        grades68: 'Infrastructure resilience is essential for earthquake-prone regions.',
      },
      takeAction: {
        k2: 'Wave at the boats when you cross the bridge!',
        grades35: 'Try the bike path on the new eastern span with your family.',
        grades68: 'Support infrastructure maintenance funding and climate adaptation planning.',
      },
      principles: {
        primary: 'II',
        secondary: ['V'],
        concepts: ['II-C', 'V-A'],
      },
      standards: {
        k2: 'K-ESS3-3',
        grades35: '5-ESS3-1',
        grades68: 'MS-ESS3-3',
      },
    },
  },
  {
    id: 'sf-seawall',
    name: 'SF Seawall',
    type: 'infrastructure',
    category: 'Flood Protection',
    icon: '🧱',
    color: '#78909c',
    coordinates: [-122.3932, 37.7942],
    content: {
      title: 'San Francisco Seawall',
      tagline: {
        k2: 'A wall that keeps the ocean out!',
        grades35: 'Protecting the city from rising seas!',
        grades68: 'Century-old infrastructure facing sea level rise challenges.',
      },
      description: {
        k2: 'This old wall keeps the water from flooding the city!',
        grades35: 'The Seawall was built over 100 years ago. It holds up the Embarcadero and BART tunnels, but needs fixing as seas rise.',
        grades68: 'The 3-mile Seawall, constructed 1878-1916, supports $100B in assets but faces liquefaction risk during earthquakes and rising sea levels.',
      },
      whyItMatters: {
        k2: 'The wall protects houses and BART trains from flooding!',
        grades35: 'Without the Seawall, downtown SF and BART would flood. We need to strengthen it!',
        grades68: 'Climate adaptation infrastructure investment protects critical assets; seawall failure could flood the transbay tube and financial district.',
      },
      funFacts: [
        {
          k2: 'The wall is over 100 years old!',
          grades35: 'Workers built the Seawall by hand over 100 years ago using rocks and old ships!',
          grades68: 'Construction used timber piles from dismantled Gold Rush ships and rock fill totaling 4 million cubic yards.',
        },
        {
          k2: 'Old ships are buried inside the wall!',
          grades35: 'Abandoned Gold Rush ships were actually used as part of the foundation!',
          grades68: 'Archaeological surveys have documented over 40 buried ships within the original fill zone.',
        },
      ],
      howItWorks: [
        {
          step: 1,
          title: 'The Foundation',
          description: {
            k2: 'Big rocks and old ships make the bottom strong.',
            grades35: 'The original Seawall sits on timber piles and rubble fill.',
            grades68: 'Timber pile foundations and rock fill create a gravity structure resisting hydrostatic pressure.',
          },
        },
        {
          step: 2,
          title: 'Holding Back Water',
          description: {
            k2: 'The wall stops waves from splashing over.',
            grades35: 'The concrete face keeps Bay water from flooding the waterfront.',
            grades68: 'The sea-facing wall provides a physical barrier against tidal and storm surge flooding.',
          },
        },
        {
          step: 3,
          title: 'Supporting the City',
          description: {
            k2: 'Buildings and roads sit on top of the wall.',
            grades35: 'The Embarcadero, BART, and buildings all depend on the Seawall for support.',
            grades68: 'Critical infrastructure including BART transbay tube portals are founded on Seawall-stabilized fill.',
          },
        },
        {
          step: 4,
          title: 'Climate Adaptation',
          description: {
            k2: 'People are making the wall stronger for bigger waves.',
            grades35: 'Engineers are upgrading the Seawall to handle rising seas and earthquakes.',
            grades68: 'A multi-billion dollar program will raise, strengthen, and provide redundant flood protection.',
          },
        },
      ],
      coralIntro: {
        k2: 'This wall keeps the Bay from flooding the city!',
        grades35: 'The Seawall is old and needs fixing. Climate change is making seas rise!',
        grades68: 'This infrastructure represents the front line of urban climate adaptation.',
      },
      takeAction: {
        k2: 'Tell grown-ups about sea level rise!',
        grades35: 'Learn about sea level rise and share what you know with others.',
        grades68: 'Support bond measures funding seawall improvements and advocate for proactive climate adaptation.',
      },
      principles: {
        primary: 'V',
        secondary: ['II'],
        concepts: ['V-A', 'V-B', 'II-C'],
      },
      standards: {
        k2: 'K-ESS3-3',
        grades35: '5-ESS3-1',
        grades68: 'MS-ESS3-3',
      },
    },
  },
  {
    id: 'altamont-landfill',
    name: 'Altamont Landfill',
    type: 'infrastructure',
    category: 'Waste',
    icon: '🗑️',
    color: '#795548',
    coordinates: [-121.6194, 37.7317],
    content: {
      title: 'Altamont Landfill',
      tagline: {
        k2: 'Where trash goes when it can\'t be recycled!',
        grades35: 'The end of the line for garbage!',
        grades68: 'Modern sanitary landfill with methane capture.',
      },
      description: {
        k2: 'This is where trash goes when we throw it away. It gets buried in the ground.',
        grades35: 'Landfills are carefully designed to keep trash from polluting the ground and water. But it\'s better to reduce, reuse, and recycle!',
        grades68: 'Modern sanitary landfills feature composite liners, leachate collection, and methane capture systems to minimize environmental impact.',
      },
      whyItMatters: {
        k2: 'We should make less trash so the landfill lasts longer!',
        grades35: 'Landfills eventually fill up. By reducing waste, we help the planet and save space.',
        grades68: 'Landfill capacity is finite; waste reduction extends site lifespan while methane capture offsets emissions.',
      },
      funFacts: [
        {
          k2: 'The buried trash makes gas that becomes electricity!',
          grades35: 'As trash breaks down, it makes methane gas. The landfill captures it to make electricity!',
          grades68: 'Landfill gas-to-energy systems capture methane (CH4) to generate 20+ MW of renewable electricity.',
        },
        {
          k2: 'Plastic bags take 500 years to break down!',
          grades35: 'A plastic bag can take 500 years to decompose - that\'s why we should use reusable bags!',
          grades68: 'Petroleum-based plastics persist for centuries; only 9% of plastics produced have been recycled.',
        },
      ],
      howItWorks: [
        {
          step: 1,
          title: 'Trash Arrives',
          description: {
            k2: 'Big trucks bring garbage from cities.',
            grades35: 'Garbage trucks bring waste from homes and businesses all over the Bay Area.',
            grades68: 'Transfer stations consolidate municipal solid waste for efficient long-haul transport to the landfill.',
          },
        },
        {
          step: 2,
          title: 'Compaction',
          description: {
            k2: 'Heavy machines squish the trash down flat.',
            grades35: 'Huge compactors crush and flatten the trash to save space.',
            grades68: 'Compaction achieves densities of 1,400+ lbs/cubic yard, maximizing airspace utilization.',
          },
        },
        {
          step: 3,
          title: 'Daily Cover',
          description: {
            k2: 'Dirt covers the trash every day.',
            grades35: 'Each day, a layer of soil covers the trash to prevent odors and pests.',
            grades68: 'Daily cover minimizes vectors, odors, and wind-blown debris per regulatory requirements.',
          },
        },
        {
          step: 4,
          title: 'Gas Capture',
          description: {
            k2: 'Pipes collect smelly gas to make power.',
            grades35: 'Pipes buried in the trash collect methane gas to generate electricity.',
            grades68: 'Vertical extraction wells and horizontal collectors route landfill gas to reciprocating engines for power generation.',
          },
        },
      ],
      coralIntro: {
        k2: 'Everything we throw away comes here. Let\'s make less trash!',
        grades35: 'This is where trash ends up. What can we do to send less here?',
        grades68: 'Understanding waste management helps us minimize our environmental footprint.',
      },
      takeAction: {
        k2: 'Use less stuff and recycle more!',
        grades35: 'Practice the 5 Rs: Refuse, Reduce, Reuse, Recycle, Rot (compost)!',
        grades68: 'Adopt zero-waste practices and support extended producer responsibility legislation.',
      },
      principles: {
        primary: 'IV',
        secondary: ['II', 'V'],
        concepts: ['IV-A', 'IV-B', 'II-B', 'V-A'],
      },
      standards: {
        k2: 'K-ESS3-3',
        grades35: '5-ESS3-1',
        grades68: 'MS-ESS3-3',
      },
    },
  },
];
