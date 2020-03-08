# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Family.create(name: 'Wijetunga', members: "Anna Sachith")
Family.create(name: 'Lipshutz', members: "Randi Drew")
Family.create(name: 'Tattan', members: "David")

Project.create(name: 'Curtains', condition:'Incomplete', family:wijetunga)
Project.create(name: 'Window', condition:'Incomplete', family:lipshutz)
Project.create(name: 'Paint', condition:'Complete', family:tattan)



