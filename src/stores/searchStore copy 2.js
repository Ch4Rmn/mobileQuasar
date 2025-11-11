import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useSearchStore = defineStore('searchStore', () => {
  const searchQuery = ref('')
  const filterType = ref('all') // all | title | category | description

  // ✅ Dummy 30 local data
  const items = ref([
    {
      id: 1,
      title: 'Yangon Flood Update',
      category: 'News',
      description: 'Heavy rain caused minor flooding in downtown Yangon.',
    },
    {
      id: 2,
      title: 'New Map Feature Released',
      category: 'Technology',
      description: 'DPSMap introduces 3D city view for Mandalay.',
    },
    {
      id: 3,
      title: 'People: Aung Min Kyaw',
      category: 'People',
      description: 'Software engineer based in Yangon, works on mapping tools.',
    },
    {
      id: 4,
      title: 'Traffic Reduced in Downtown',
      category: 'News',
      description: 'Less traffic this morning due to school holidays.',
    },
    {
      id: 5,
      title: 'New Bago Routes Added',
      category: 'Travel',
      description: 'Explore new routes and destinations in Bago region.',
    },
    {
      id: 6,
      title: 'People: Su Su Hlaing',
      category: 'People',
      description: 'Marketing specialist from Mandalay.',
    },
    {
      id: 7,
      title: 'Mobile App Launched',
      category: 'Technology',
      description: 'DPSMap mobile app available on Android.',
    },
    {
      id: 8,
      title: 'Yangon Night Market',
      category: 'Lifestyle',
      description: 'Local vendors and food stalls reopen in Lanmadaw.',
    },
    {
      id: 9,
      title: 'People: Kyaw Zin',
      category: 'People',
      description: 'Freelancer and map enthusiast.',
    },
    {
      id: 10,
      title: 'New Features in DPSMap',
      category: 'Technology',
      description: 'Now supports offline map view and GPS tracking.',
    },
    {
      id: 11,
      title: 'Mandalay Cleanup Campaign',
      category: 'News',
      description: 'Volunteers clean up main streets and riverside.',
    },
    {
      id: 12,
      title: 'People: May Thazin',
      category: 'People',
      description: 'Cartographer and digital artist.',
    },
    {
      id: 13,
      title: 'New Update Available',
      category: 'Technology',
      description: 'Version 2.5 brings better performance.',
    },
    {
      id: 14,
      title: 'People: Tun Naing',
      category: 'People',
      description: 'Web developer from Bago.',
    },
    {
      id: 15,
      title: 'Yangon City Festival',
      category: 'Lifestyle',
      description: 'Enjoy music, food, and fun at People’s Park.',
    },
    {
      id: 16,
      title: 'Mandalay Weather Alert',
      category: 'News',
      description: 'Expect heavy rain this weekend.',
    },
    {
      id: 17,
      title: 'People: Hnin Ei Mon',
      category: 'People',
      description: 'GIS Analyst based in Yangon.',
    },
    {
      id: 18,
      title: 'New Bus Routes Added',
      category: 'Travel',
      description: 'Public transport improved in Mandalay region.',
    },
    {
      id: 19,
      title: 'People: Lin Htut Kyaw',
      category: 'People',
      description: 'Web Developer working with Laravel & Quasar.',
    },
    {
      id: 20,
      title: 'Top 10 Map Tools',
      category: 'Technology',
      description: 'Discover useful tools for developers and travelers.',
    },
    {
      id: 21,
      title: 'DPSMap Partners with Schools',
      category: 'News',
      description: 'Helping students learn geography interactively.',
    },
    {
      id: 22,
      title: 'People: Nay Chi Oo',
      category: 'People',
      description: 'Project manager for map-based startups.',
    },
    {
      id: 23,
      title: 'Bago Festival Announced',
      category: 'Lifestyle',
      description: 'Traditional performances and exhibitions.',
    },
    {
      id: 24,
      title: 'New POI Added',
      category: 'Technology',
      description: 'New tourist attractions now visible in Yangon map.',
    },
    {
      id: 25,
      title: 'People: Zaw Min Oo',
      category: 'People',
      description: 'Full-stack developer contributing to DPSMap.',
    },
    {
      id: 26,
      title: 'Tourism Growing in Bagan',
      category: 'Travel',
      description: 'Visitor numbers up by 25% this month.',
    },
    {
      id: 27,
      title: 'People: Ei Mon Khin',
      category: 'People',
      description: 'UI/UX designer for travel applications.',
    },
    {
      id: 28,
      title: 'Yangon Green Spaces',
      category: 'Lifestyle',
      description: 'City adds more public parks and trees.',
    },
    {
      id: 29,
      title: 'People: Win Kyaw Moe',
      category: 'People',
      description: 'Back-end engineer with experience in APIs.',
    },
    {
      id: 30,
      title: 'New Data Tools Coming Soon',
      category: 'Technology',
      description: 'DPSMap announces upcoming analytics dashboard.',
    },
  ])

  // ✅ Fetch data from API and push into items
  const fetchPokemon = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/data')
      const data = await res.json()
      console.log(data);

      const newItems = data.results.map((p, i) => ({
        id: items.value.length + i + 1,
        title: p.name.charAt(0).toUpperCase() + p.name.slice(1),
        category: 'Pokémon',
        description: `This is ${p.name}, a Pokémon fetched from the API.`,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i + 1}.png`,
      }))

      items.value.push(...newItems)
      console.log('✅ Pokémon fetched & added:', newItems.length)
    } catch (err) {
      console.error('❌ Fetch error:', err)
    }
  }


  const filteredItems = computed(() => {
    const query = searchQuery.value.trim().toLowerCase()
    if (!query) return items.value

    return items.value.filter((item) => {
      if (filterType.value === 'title') return item.title.toLowerCase().includes(query)
      if (filterType.value === 'category') return item.category.toLowerCase().includes(query)
      if (filterType.value === 'description') return item.description.toLowerCase().includes(query)
      return (
        item.title.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      )
    })
  })

  return {
    searchQuery,
    filterType,
    items,
    filteredItems,
    fetchPokemon,
  }
})
