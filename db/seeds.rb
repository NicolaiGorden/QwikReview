#USERS
User.create(username: "Luigi", password: "Ilovemybro")
User.create(username: "Wright", password: "Stepladder")
User.create(username: "MasterChief", password: "Cortana")
User.create(username: "Toriel", password: "SnailpieGOATed")
User.create(username: "Monokuma", password: "Punishmenttime")


# Profile.find_by(user_id: 1).bio = "Hello World"

#GAMES
Game.create(guid:"3030-48579", name:"Rhythm Heaven Megamix", art:"https://www.giantbomb.com/a/uploads/original/8/82063/2896839-6215576118-SQ_3D.jpg")
Game.create(guid:"3030-43883", name:"Puyo Puyo Tetris", art:"https://www.giantbomb.com/a/uploads/original/8/85465/2912120-81fez0skvll._ac_sl1500_.jpg")
Game.create(guid:"3030-72014", name:"Apex Legends", art:"https://www.giantbomb.com/a/uploads/original/8/87790/3079288-box_al.png",)
Game.create(guid:"3030-19929", name:"Paper Mario", art:"https://www.giantbomb.com/a/uploads/original/8/87790/2108508-box_pm.png")
Game.create(guid:"3030-59383", name:"Slay the Spire", art:"https://www.giantbomb.com/a/uploads/original/8/87790/3103069-box_sts.png")
Game.create(guid:"3030-36113", name:"Counter-Strike: Global Offensive", art:"https://www.giantbomb.com/a/uploads/original/1/13692/2302957-i2cs9uzmq4yua.jpg")
Game.create(guid:"3030-74573", name:"Guilty Gear -Strive-", art:"https://www.giantbomb.com/a/uploads/original/36/361609/3277315-2822407957-3hxaj.png")
Game.create(guid:"3030-47425", name:"Five Nights at Freddy's", art:"https://www.giantbomb.com/a/uploads/original/0/1992/3148109-image%20%282%29.jpeg")
Game.create(guid:"3030-50877", name:"Kingdom Hearts HD II.8: Final Chapter Prologue", art:"https://www.giantbomb.com/a/uploads/original/5/56735/2897973-91vryt--gzl._ac_sl1500_.jpg")
Game.create(guid:"3030-85547", name:"Street Fighter 6", art:"https://www.giantbomb.com/a/uploads/original/33/338034/3430939-0687451623-apps.59767.14292384283824656.ca6a1643-b1bc-4054-ac12-faa77321c653.5e742961-aa3f-4ce1-9dcd-6abe2f444da6.jpg")

Game.create(guid:"3030-68906", name:"Halo Infinite", art:"https://www.giantbomb.com/a/uploads/original/0/1992/3225194-edifgmywoaakax_.jpeg",)
Game.create(guid:"3030-59862", name:"Dragon Ball FighterZ", art:"https://www.giantbomb.com/a/uploads/original/8/87790/2993180-box_dbfz.png")
Game.create(guid:"3030-54733", name:"Sonic Mania", art:"https://www.giantbomb.com/a/uploads/original/8/82063/2926543-sonicmania_key_art_1489651437.jpg")
Game.create(guid:"3030-21084", name:"Kirby: Super Star Ultra", art:"https://www.giantbomb.com/a/uploads/original/1/14741/1131531-ksu.jpg")
Game.create(guid:"3030-37357", name:"Phoenix Wright: Ace Attorney Trilogy", art:"https://www.giantbomb.com/a/uploads/original/9/97089/3021997-61-c7djrmsl.jpg")

Game.create(guid:"3030-18373", name:"We Love Katamari", art:"https://www.giantbomb.com/a/uploads/original/8/87790/1832937-box_wlkatamari.png")
Game.create(guid:"3030-89481", name:"Super Mario Bros. Wonder", art:"https://www.giantbomb.com/a/uploads/original/20/201266/3513405-5578206996-46344.jpg")
Game.create(guid:"3030-30475", name:"Minecraft", art:"https://www.giantbomb.com/a/uploads/original/8/87790/3020660-box_mc.png")
Game.create(guid:"3030-47365", name:"Silent Hills", art:"https://www.giantbomb.com/a/uploads/original/0/6087/2669677-2669609-2114550608-fropq.jpg")
Game.create(guid:"3030-86329", name:"Resident Evil 4", art:"https://www.giantbomb.com/a/uploads/original/5/56742/3502363-co6bo0.png")

#REVIEWS
Review.create(title:"testreview1", body:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac velit leo. Maecenas condimentum ante eget tellus interdum sagittis. Fusce dictum neque magna, quis commodo elit venenatis et. Fusce scelerisque est quis mi mollis, eget dictum tortor.", user_id:1, game_id:5, score:1)
Review.create(title:"testreview2", body:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac velit leo. Maecenas condimentum ante eget tellus interdum sagittis. Fusce dictum neque magna, quis commodo elit venenatis et. Fusce scelerisque est quis mi mollis, eget dictum tortor.", user_id:1, game_id:1, score:8)
Review.create(title:"testreview3", body:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac velit leo. Maecenas condimentum ante eget tellus interdum sagittis. Fusce dictum neque magna, quis commodo elit venenatis et. Fusce scelerisque est quis mi mollis, eget dictum tortor.", user_id:2, game_id:5, score:4)
Review.create(title:"testreview4", body:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac velit leo. Maecenas condimentum ante eget tellus interdum sagittis. Fusce dictum neque magna, quis commodo elit venenatis et. Fusce scelerisque est quis mi mollis, eget dictum tortor.", user_id:2, game_id:2, score:3)
Review.create(title:"testreview5", body:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac velit leo. Maecenas condimentum ante eget tellus interdum sagittis. Fusce dictum neque magna, quis commodo elit venenatis et. Fusce scelerisque est quis mi mollis, eget dictum tortor.", user_id:3, game_id:3, score:6)
Review.create(title:"testreview6", body:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac velit leo. Maecenas condimentum ante eget tellus interdum sagittis. Fusce dictum neque magna, quis commodo elit venenatis et. Fusce scelerisque est quis mi mollis, eget dictum tortor.", user_id:3, game_id:4, score:10)
Review.create(title:"testreview7", body:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac velit leo. Maecenas condimentum ante eget tellus interdum sagittis. Fusce dictum neque magna, quis commodo elit venenatis et. Fusce scelerisque est quis mi mollis, eget dictum tortor.", user_id:4, game_id:1, score:4)
Review.create(title:"testreview8", body:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac velit leo. Maecenas condimentum ante eget tellus interdum sagittis. Fusce dictum neque magna, quis commodo elit venenatis et. Fusce scelerisque est quis mi mollis, eget dictum tortor.", user_id:4, game_id:2, score:7)
Review.create(title:"testreview9", body:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac velit leo. Maecenas condimentum ante eget tellus interdum sagittis. Fusce dictum neque magna, quis commodo elit venenatis et. Fusce scelerisque est quis mi mollis, eget dictum tortor.", user_id:5, game_id:2, score:2)
Review.create(title:"testreview10", body:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac velit leo. Maecenas condimentum ante eget tellus interdum sagittis. Fusce dictum neque magna, quis commodo elit venenatis et. Fusce scelerisque est quis mi mollis, eget dictum tortor.", user_id:5, game_id:3, score:9)
Review.create(title:"testreview11", body:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac velit leo. Maecenas condimentum ante eget tellus interdum sagittis. Fusce dictum neque magna, quis commodo elit venenatis et. Fusce scelerisque est quis mi mollis, eget dictum tortor.", user_id:5, game_id:17, score:10)
Review.create(title:"testreview12", body:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac velit leo. Maecenas condimentum ante eget tellus interdum sagittis. Fusce dictum neque magna, quis commodo elit venenatis et. Fusce scelerisque est quis mi mollis, eget dictum tortor.", user_id:1, game_id:17, score:3)
Review.create(title:"testreview13", body:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac velit leo. Maecenas condimentum ante eget tellus interdum sagittis. Fusce dictum neque magna, quis commodo elit venenatis et. Fusce scelerisque est quis mi mollis, eget dictum tortor.", user_id:2, game_id:17, score:7)
Review.create(title:"testreview14", body:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac velit leo. Maecenas condimentum ante eget tellus interdum sagittis. Fusce dictum neque magna, quis commodo elit venenatis et. Fusce scelerisque est quis mi mollis, eget dictum tortor.", user_id:3, game_id:17, score:9)
Review.create(title:"testreview15", body:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac velit leo. Maecenas condimentum ante eget tellus interdum sagittis. Fusce dictum neque magna, quis commodo elit venenatis et. Fusce scelerisque est quis mi mollis, eget dictum tortor.", user_id:4, game_id:17, score:6)