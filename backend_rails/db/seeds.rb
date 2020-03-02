# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Client.destroy_all
Vehicle.destroy_all

25.times do
    User.create!(name: Faker::Name.name, total_sales: Faker::Number.between(from: 500, to: 250000), cars_sold: Faker::Number.between(from: 1, to: 150), team_name: Faker::Team.creature,position: Faker::Military.army_rank)
end

35.times do
    Client.create!(fullname: Faker::FunnyName.two_word_name, phone_number: Faker::PhoneNumber.cell_phone, email: Faker::Internet.free_email, address: Faker::Address.street_address)
end

Vehicle.create(year: 2016, make: "Cadillac", model: "Escalade", img_url: "https://cars.usnews.com/static/images/Auto/izmo/i2314336/2016_cadillac_escalade_angularfront.jpg", mileage: Faker::Number.between(from: 1, to: 95000) , purchase_date: Faker::Date.backward(days: 90) , purchase_price: Faker::Number.number(digits: 5) )
Vehicle.create(year: 2020, make: "Chevrolet", model: "Camaro", img_url: "https://content.autotrader.com/content/dam/autotrader/articles/Cars/Chevrolet/Camaro/2020/2020ChevroletCamaro/2020-Chevrolet-Camaro-(1).jpg", mileage: Faker::Number.between(from: 1, to: 95000) , purchase_date: Faker::Date.backward(days: 90) , purchase_price: Faker::Number.number(digits: 5) )
Vehicle.create(year: 2018, make: "Ford", model: "F-150", img_url: "https://www.cstatic-images.com/car-pictures/xl/usc90fot11af021001.png", mileage: Faker::Number.between(from: 1, to: 95000) , purchase_date: Faker::Date.backward(days: 90) , purchase_price: Faker::Number.number(digits: 5) )
Vehicle.create(year: 2017, make: "BMW", model: "330i", img_url: 'https://m.media-amazon.com/images/I/71mWGhau91L._UY560_.jpg', mileage: Faker::Number.between(from: 1, to: 95000) , purchase_date: Faker::Date.backward(days: 90) , purchase_price: Faker::Number.number(digits: 5) )
Vehicle.create(year: 2019, make: "BMW", model: "428i", img_url: 'https://images.hgmsites.net/lrg/2019-bmw-4-series-430i-gran-coupe-angular-front-exterior-view_100657902_l.jpg', mileage: Faker::Number.between(from: 1, to: 95000) , purchase_date: Faker::Date.backward(days: 90) , purchase_price: Faker::Number.number(digits: 5) )
Vehicle.create(year: 2017, make: "Lexus", model: "RX 350", img_url: 'https://m.media-amazon.com/images/I/71NmcG3M45L._UY560_.jpg', mileage: Faker::Number.between(from: 1, to: 95000) , purchase_date: Faker::Date.backward(days: 90) , purchase_price: Faker::Number.number(digits: 5) )
Vehicle.create(year: 2018, make: "Chevrolet", model: "Corvette", img_url: 'https://cars.usnews.com/static/images/Auto/izmo/i31351529/2018_chevrolet_corvette_angularfront.jpg', mileage: Faker::Number.between(from: 1, to: 95000) , purchase_date: Faker::Date.backward(days: 90) , purchase_price: Faker::Number.number(digits: 5) )
Vehicle.create(year: 2019, make: "Cadillac", model: "CTS-V", img_url: 'https://autopublishers.com/WebSites/1381/Images/Blogs/3734/2017_cadillac_cts-v_LIFE1_ot_1202163_1600.jpg', mileage: Faker::Number.between(from: 1, to: 95000) , purchase_date: Faker::Date.backward(days: 90) , purchase_price: Faker::Number.number(digits: 5) )
Vehicle.create(year: 2020, make: "BMW", model: "X4", img_url: 'https://cdn.motor1.com/images/mgl/X8oKl/s1/2019-bmw-x4-m40i.jpg', mileage: Faker::Number.between(from: 1, to: 95000) , purchase_date: Faker::Date.backward(days: 90) , purchase_price: Faker::Number.number(digits: 5) )
Vehicle.create(year: 2016, make: "BMW", model: "X5", img_url: 'https://www.cstatic-images.com/car-pictures/xl/USC40BMS191A021001.png', mileage: Faker::Number.between(from: 1, to: 95000) , purchase_date: Faker::Date.backward(days: 90) , purchase_price: Faker::Number.number(digits: 5) )
Vehicle.create(year: 2018, make: "BMW", model: "X6", img_url: 'https://images.hgmsites.net/lrg/2018-bmw-x6-m-sports-activity-coupe-angular-front-exterior-view_100637402_l.jpg', mileage: Faker::Number.between(from: 1, to: 95000) , purchase_date: Faker::Date.backward(days: 90) , purchase_price: Faker::Number.number(digits: 5) )
Vehicle.create(year: 2019, make: "Cadillac", model: "XTS", img_url: 'https://inventory-dmg.assets-cdk.com/6/1/2/21907801216.jpg', mileage: Faker::Number.between(from: 1, to: 95000) , purchase_date: Faker::Date.backward(days: 90) , purchase_price: Faker::Number.number(digits: 5) )
Vehicle.create(year: 2017, make: "Lexus", model: "IS 300", img_url: 'https://www.cstatic-images.com/car-pictures/xl/cac70lec081a021001.png', mileage: Faker::Number.between(from: 1, to: 95000) , purchase_date: Faker::Date.backward(days: 90) , purchase_price: Faker::Number.number(digits: 5) )
Vehicle.create(year: 2016, make: "Chevrolet", model: "Camaro", img_url: 'https://www.autoguide.com/blog/wp-content/gallery/2016-chevrolet-camaro-1ss-review-6-3-2016/2016-Chevrolet-Camaro-1SS-Front-01.jpg', mileage: Faker::Number.between(from: 1, to: 95000) , purchase_date: Faker::Date.backward(days: 90) , purchase_price: Faker::Number.number(digits: 5) )
Vehicle.create(year: 2019, make: "BMW", model: "M4", img_url: 'https://media.ed.edmunds-media.com/bmw/m4-cs/2019/oem/2019_bmw_m4-cs_coupe_base_fq_oem_1_500.jpg', mileage: Faker::Number.between(from: 1, to: 95000) , purchase_date: Faker::Date.backward(days: 90) , purchase_price: Faker::Number.number(digits: 5) )
Vehicle.create(year: 2020, make: "BMW", model: "M6", img_url: 'https://postmediadriving.files.wordpress.com/2019/04/chrome-image-399444.png?w=800&h=520&crop=1', mileage: Faker::Number.between(from: 1, to: 95000) , purchase_date: Faker::Date.backward(days: 90) , purchase_price: Faker::Number.number(digits: 5) )
Vehicle.create(year: 2017, make: "Ford", model: "F-250", img_url: 'https://fleetimages.bobitstudios.com/upload/content/_migrated/m-17fordf250xlt-1017-hr-2.jpg', mileage: Faker::Number.between(from: 1, to: 95000) , purchase_date: Faker::Date.backward(days: 90) , purchase_price: Faker::Number.number(digits: 5) )
Vehicle.create(year: 2018, make: "Honda", model: "Civic", img_url: 'https://www.cstatic-images.com/car-pictures/xl/USC80HOC024D021001.png', mileage: Faker::Number.between(from: 1, to: 95000) , purchase_date: Faker::Date.backward(days: 90) , purchase_price: Faker::Number.number(digits: 5) )
Vehicle.create(year: 2019, make: "Honda", model: "Civic", img_url: 'https://cnet2.cbsistatic.com/img/VxlLREVubewUsgHPV_A7GUn8ILM=/1240x775/2019/05/20/95e44f16-4eda-427d-aae4-1df5309547f6/2019-honda-civic-touring-sedan-1.jpg', mileage: Faker::Number.between(from: 1, to: 95000) , purchase_date: Faker::Date.backward(days: 90) , purchase_price: Faker::Number.number(digits: 5) )
Vehicle.create(year: 2019, make: "Cadillac", model: "Escalade", img_url: 'https://cars.usnews.com/static/images/Auto/izmo/i159423463/2020_cadillac_escalade_esv_angularfront.jpg', mileage: Faker::Number.between(from: 1, to: 95000) , purchase_date: Faker::Date.backward(days: 90) , purchase_price: Faker::Number.number(digits: 5) )
Vehicle.create(year: 2019, make: "BMW", model: "760i", img_url: 'https://s1.cdn.autoevolution.com/images/news/2020-bmw-7-series-leaked-again-this-time-its-the-760li-xdrive-131658_1.jpg', mileage: Faker::Number.between(from: 1, to: 95000) , purchase_date: Faker::Date.backward(days: 90) , purchase_price: Faker::Number.number(digits: 5) )
