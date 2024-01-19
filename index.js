import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import nodemailer from 'nodemailer';
const app = express();
const port = 3000;
import dotenv from 'dotenv';
dotenv.config();

// Access your environment variables

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const api_Key = process.env.API_KEY;
const config = {
    headers: { apiKey:  api_Key},
  };
var dataList = [ "Kiev",
    'Kyiv', 'Kharkiv', 'Odesa', 'Dnipro', 'Donetsk', 'Zaporizhzhia', 'Lviv', 'Kryvyi Rih', 'Sevastopol', 'Mykolaiv',
    'Mariupol', 'Luhansk', 'Vinnytsia', 'Makiivka', 'Simferopol', 'Poltava', 'Chernihiv', 'Kherson', 'Cherkasy', 'Khmelnytskyi',
    'Chernivtsi', 'Sumy', 'Zhytomyr', 'Horlivka', 'Rivne', 'Ivano-Frankivsk', 'Kamianske', 'Kropyvnytskyi', 'Ternopil', 'Kremenchuk',
    'Lutsk', 'Bila Tserkva', 'Kramatorsk', 'Melitopol', 'Sievierodonetsk', 'Kerch', 'Drohobych', 'Khrustalnyi', 'Uzhhorod',
    'Berdiansk', 'Sloviansk', 'Nikopol', 'Brovary', 'Yevpatoriia', 'Pavlohrad', 'Alchevsk', 'Konotop', 'Kamianets-Podilskyi',
    'Lysychansk', 'Dovzhansk', 'Mukacheve', 'Uman', 'Chervonohrad', 'Yalta', 'Yenakiieve', 'Bakhmut', 'Stakhanov', 'Nizhyn',
    'Kostiantynivka', 'Fedosiia', 'Kovel', 'Smila', 'Korosten', 'Pokrovsk', 'Pervomaisk', 'Kolomyia', 'Rubizhne', 'Chornomorsk',
    'Khartsyzk', 'Druzhkivka', 'Stryi', 'Bilhorod-Dnistrovskyi', 'Irpin', 'Novohrad-Volynskyi', 'Lozova', 'Antratsyt', 'Chystiakove',
    'Horishni Plavni', 'Myrnohrad', 'Shakhtarsk', 'Okhtyrka', 'Brianka', 'Snizhne', 'Rovenky', 'Fastiv', 'Lubny', 'Krasnodon',
    'Shepetivka', 'Romny', 'Myrhorod', 'Podilsk', 'Vyshneve', 'Vasylkiv', 'Dubno', 'Boryslav', 'Holubivske', 'Boyarka', 'Yasynuvata',
    'Bucha', 'Avdiivka', 'Sambir', 'Toretsk', 'Zhmerynka', 'Chuhuiv', 'Mohyliv-Podilskyi', 'Truskavets', 'Khmilnyk', 'Kupiansk',
    'Pereyaslav-Khmel’nyts’kyy', `Sofiyivs’ka Borshchahivka`, 'Perevalsk', 'Vynohradiv', 'Saky', 'Selydove', 'Pesochin', 'Molodohvardiisk',
    'Merefa', 'Bilohorodka', 'Sukhodilsk', 'Liubotyn', `Kotsyubyns’ke`, 'Hostomel', 'Taromske', 'Vynnyky', 'Chervonopartyzansk',
    'Nyzhnia Krynka', 'Petrovske', 'Antonivka', 'Zhdanivka', 'Vakhrusheve', 'Hirnyk', 'Sartana', 'Haspra', 'Novgorodskoye', 'Inkerman',
    'Korolevo', 'Sniatyn', 'Sofiivka', 'Bezliudivka', 'Bilenke', 'Hurzuf', 'Horodenka', 'Masandra', 'Yasnohirka', 'Pochaiv', 'Vuhlehirsk',
    'Zorynsk', 'Komyshany', 'Piskivka', 'Karnaukhivka', 'Rozkishne', 'Vorzel', 'Halych', 'Petropavlivs’ka Borshchahivka', 'Balabyne',
    'Zelenivka', 'Chornukhyne', 'Koreiz', 'Bryukhovychi', 'Horenka', 'Zalizne', 'Khotiv', 'Chabany', 'Novooleksandrivka', 'Almazna',
    'Shabelkivka', 'Obroshino', 'Novopillia', 'Simeiz', 'Novosilky', 'Duliby', 'Kryukivshchyna', 'Rohan', 'Mykhaylivka-Rubezhivka',
    'Valianivske', 'Malokaterynivka', 'Vylok', 'Kulynychi', 'Sadky', 'Pervomaiskyi', 'Brytivka', 'Blyzhnie', 'Lyubymivka', 'Mala Rohan',
    'Kaihador', 'Nikita', 'Tereshky', 'Zarichany', 'Aviatorske', 'Mykhailivka', 'Verkhnosadove', 'Aeroflotskyi', 'Chornotysiv', 'Borki',
    'Piilo', 'Yablunytsia', 'Dobrovlyany', 'Bilshivtsi', 'Ruski Tyshky', 'Shcherbani', 'Stari Kodaky', 'Berezivka', 'Nasypne', 'Lisnyky',
    'Andriivka', 'Iverske', 'Chukaluvka', 'Pokrovske', 'Solomonovo', 'Lavky', 'Slobozhanske', 'Shevchenkivske', 'Krasnokamianka', 'Bairachky',
    'Marianivka', 'Volodymyr-Volynskyi'
];
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: 'niktestpython@gmail.com', // replace with your email
      pass: process.env.PASSWORD // replace with your email password or an app-specific password
    }
  });
app.get("/", async (req, res) => {
    res.render("index.ejs");
});
app.post("/find_flight", async (req, res) => {
    var city_from = req.body.city_from;
    var city_to = req.body.city_to;
    var name = req.body.name;
    var email = req.body.email;
    var adults_num = req.body.adults_num;
    var children_num = req.body.child_num;
    var currency = req.body.curr;
    var stopovers = req.body.stop;
    var price = req.body.price;
    var date_to = req.body.date_to;
    var date_from = req.body.date_from;
    var new_dict = {
          name: name,
          email: email,
          adults: adults_num,
          children: children_num,
          currency: currency,
          stop:  stopovers,
          price: price,   
    }
    if (dataList.includes(city_from) || dataList.includes(city_to)) {
        res.render("index.ejs", { error: "Oh, there is a war in Ukraine(. Type another cities.", section: "find_form", data: new_dict });
    } else{try {
        const responseTo = await axios.get("https://api.tequila.kiwi.com/locations/query?term=" + city_to +  "&location_types=city", config );
        const result1 = responseTo.data;
        // console.log(result1);
        const responseFrom = await axios.get("https://api.tequila.kiwi.com/locations/query?term=" + city_from +  "&location_types=city", config );
        const result2 = responseFrom.data;
        // console.log(result2);
        if (result1.locations.length === 0 && result2.locations.length === 0) {
            res.render("index.ejs", {error: "Type valid Locations", section: "find_form", data: new_dict});
        } else if (result2.locations.length === 0){
            res.render("index.ejs", {error: "Type valid City You Fly from", section: "find_form", data: new_dict});
        } else if (result1.locations.length === 0 ){
            res.render("index.ejs", {error: "Type valid City You Fly to", section: "find_form", data: new_dict});
        } else{
            console.log('success')
            var city_from_code = result2.locations[0].code;
            var city_to_code = result1.locations[0].code;
            console.log(city_from_code);
            console.log(city_to_code)
            
            
            var dateToObj_to = new Date(date_to);            
            var year_to = dateToObj_to.getFullYear();
            var month_to = (dateToObj_to.getMonth() + 1).toString().padStart(2, '0');
            var day_to = dateToObj_to.getDate().toString().padStart(2, '0');
            var new_date_to = `${day_to}/${month_to}/${year_to}`;
            
            var dateToObj_from = new Date(date_from);            
            var year_from = dateToObj_from.getFullYear();
            var month_from = (dateToObj_from.getMonth() + 1).toString().padStart(2, '0');
            var day_from = dateToObj_from.getDate().toString().padStart(2, '0');
            var new_date_from = `${day_from}/${month_from}/${year_from}`;
            
            console.log(new_date_to);
            console.log(new_date_from);
                try {
                    var url = `https://api.tequila.kiwi.com/search?fly_from=${city_from_code}&fly_to=${city_to_code}&date_from=${new_date_from}&date_to=${new_date_from}&return_from=${new_date_to}&return_to=${new_date_to}&adults=${adults_num}&children=${children_num}&curr=${currency}&max_stopovers=${stopovers}&one_for_city=1`;
                    console.log(url)
                    const result = await axios.get(url, config);       
                    console.log(result.data);
                    var link = result.data.data[0].deep_link;
                    var got_price = result.data.data[0].price;
                    console.log(link);
                    console.log(got_price);
                    if (got_price > price) {
                        // Send an email for higher price
                        const mailOptionsHigher = {
                          from: "niktestpython@gmail.com",
                          to: email, // replace with the actual recipient email
                          subject: 'Flight Price Alert',
                          text: `Hi, ${name}. Unfortunately, the flight with your desired price of ${currency} ${price} wasn't found. But still you can check it out: ${link} `,
                        };
                    
                        transporter.sendMail(mailOptionsHigher, (error, info) => {
                          if (error) {
                            console.error('Error sending email:', error.message);
                            res.render("index.ejs", {error: "Error sending email: Type valid Email.", section: "find_form", data: new_dict});

                          } else {
                            res.render('index.ejs', { not_success: `Unfortunately, the flight with the desired price wasn't found. For more details, check your email.` });

                        }
                        });
                    
                      } else if (got_price < price) {
                        // Send an email for lower price
                        const mailOptionsLower = {
                          from: "niktestpython@gmail.com",
                          to: email, // replace with the actual recipient email
                          subject: 'Flight Price Alert',
                          text: `Hi, ${name}. Great news! We found a flight for you at a lower price of ${currency} ${got_price}. Check it out: ${link}`,
                        };
                    
                        transporter.sendMail(mailOptionsLower, (error, info) => {
                          if (error) {
                            console.error('Error sending email:', error.message);
                            res.render("index.ejs", {error: "Error sending email: Type valid Email.", section: "find_form", data: new_dict});

                          } else {
                            res.render('index.ejs', { success: 'The flight with the desired price was found, Check your email!' });
                          }
                        });
                    
                        
                    } }
                catch (error) {
                    console.log(error.message)
                    res.render("index.ejs", {error: "Some error occurred. Try to Type valid range of Dates or Another City!", section: "find_form", data: new_dict});
                }
            }
            
        }
      catch (error) {
        console.error("Failed to make request:", error.message);
        
      }}
    
    });




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
