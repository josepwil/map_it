# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


puts "Seeding data ..."

user = User.create([{ 
  name: 'Brian', 
  email: 'brian@test.com', 
  password: 'test'
  }])


map = Map.create(
  title: 'Best Pizza spots in London',
  center: '51.505, -0.09'
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
  }
])

