# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


puts "Seeding data ..."
User.destroy_all

user = User.create([{ 
  name: 'Brian', 
  email: 'brian@test.com', 
  password: 'test'
  },
  {
  name: 'Alice', 
  email: 'alice@test.com', 
  password: 'test'
  }
  ])

Marker.destroy_all
Map.destroy_all

map = Map.create([
  {
  title: 'Best Pizza spots in London',
  center: '51.505, -0.09',
  user_id: 1
},
{
  title: 'Best cafes in London',
  center: '51.605, -0.09',
  user_id: 1
},
{
  title: 'Best record stores in London',
  center: '51.605, -0.09',
  user_id: 2
}
]
)

markers = Marker.create([
  {
  map_id: 1,
  coords: '51.505, -0.09',
  popup: 'Dominos'
  },
  {
    map_id: 1,
    coords: '51.500, -0.09',
    popup: 'Pizza Hut'
  },
  {
  map_id: 2,
  coords: '51.605, -0.09',
  popup: 'Starbucks'
  },
  {
    map_id: 2,
    coords: '51.600, -0.09',
    popup: 'Cafe Nero'
  },
  {
    map_id: 3,
    coords: '51.600, -0.09',
    popup: 'Cool records'
  }
])

