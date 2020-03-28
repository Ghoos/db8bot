exports.run = function (client, message, args) {
    // let { PythonShell } = require('python-shell')
    // let pyshell = new PythonShell('./script.py');
    const superagent = require('superagent');
    // const fs = require("fs");
    // const request = require("request-promise-native");
    // const scholar = require('google-scholar-extended')
    const querystring = require('querystring');
    var scholar = require('google-scholar-link')
    const Discord = require('discord.js');
    const config = client.config
    // var eprint = {};
    var scholarLink = ""
    if (args.join(' ') === "") {
        const help = new Discord.MessageEmbed()
            .setColor("#f0ffff")
            .setDescription("**Command: **" + `${config.prefix}get`)
            .addField("**Usage:**", `${config.prefix}get <research report link/doi link>`)
            .addField("**Example:**", `${config.prefix}get https://www.doi.org/10.2307/1342499/`)
            .addField("**Expected Result From Example:**", "Bot will search sci-hub for the specified document. If it is found, it will return a PDF to the channel. If PDF is too alrge, the PDF link will be sent.")
        message.channel.send({ embed: help })
        return;
    }
    superagent
        .get(`https://sci-hub.tw/${args.join(' ')}`)
        .end((err, res) => {
            // Calling the end function will send the request
            var found = res.text.match(/<iframe src = \"(.*?)\" id = \"pdf\"><\/iframe>/)
            // console.log(found)
            if (found === null) {
                message.reply(`Not found on Sci-Hub! :( Try the following Google Scholar link (Incase they have a free PDF)`)
                // console.log(scholar(querystring.escape(args.join(' '))))
                scholarLink=scholar(querystring.escape(args.join(' ')))
                scholarLink=scholarLink.substring(0,scholarLink.length-1)
                // console.log(scholarLink)
                scholarLink=scholarLink.substring(0,scholarLink.indexOf('"'))+scholarLink.substring(scholarLink.indexOf('"')+1)
                message.channel.send(scholarLink)
               
            } else {
                if (found[1].indexOf("https") === -1) {
                    found[1] = "https:" + found[1];
                }
                // message.channel.send(found)
                // async function downloadPDF(pdfURL, outputFilename) {
                //     let pdfBuffer = await request.get({ uri: pdfURL, encoding: null });
                //     console.log("Writing downloaded PDF file to " + outputFilename + "...");
                //     fs.writeFileSync(outputFilename, pdfBuffer);
                // }

                // downloadPDF(found[1], `./${args.join(' ')}`);
                // console.log(found[1])
                try {
                    message.channel.send(found[1])
                    message.channel.send({
                        files: [found[1] + ".pdf"]
                    }).catch(err => console.log(err))
                } catch (e) {
                    // message.channel.send("PDF too large... Sending Sci-hub link.")
                    // message.channel.send(found[1])
                    console.log(e)
                }
            }
        })
}

// ARCHIVAL2: 
 // console.log(args.join(' '))
                // pyshell.send(args.join(' '));
                // pyshell.on('message', function (message) {
                //     // received a message sent from the Python script (a simple "print" statement)
                //     console.log(message);
                // });

                // // end the input stream and allow the process to exit
                // pyshell.end(function (err, code, signal) {
                //     if (err) throw err;
                //     console.log('The exit code was: ' + code);
                //     console.log('The exit signal was: ' + signal);
                //     console.log('finished');
                //     console.log('finished');
                // });
                // scholar rate limited by google :(
                    
// ARCHIVAL1:

 // // message.reply(`Not found on sci-hub!`)
                // // return
                // console.log("WOOO")
                // // PythonShell.run('./script.py', null, function (err, results) {
                // //     if (err) throw err;
                // //     console.log('finished');
                // //     console.log(results)
                // //     // console.log(results.)
                // // });
                // pyshell.send(args.join(' '))
                // console.log("sent....")
                // pyshell.on('message', function (msg) {
                //     // eprint = msg;
                //     console.log(msg)
                //     // console.log(message.indexOf("eprint"))
                //     // callback(msg)
                //     // if (msg.indexOf("eprint") != -1) {

                //     //     eprint = msg.substring(msg.indexOf('eprint'))
                //     //     // return eprint
                //     //     console.log(eprint)
                //     // }
                // });
                // // message.channel.send(eprint)
                // // console.log(eprint)

                // // eprint = runPy(args.join(' '))
                // // function runPy(data){
                // //     return new Promise((resolve, reject) => {
                // //       let result;
                // //       let pyshell = new PythonShell('script.py'); // , {mode: 'text', args: [date]}

                // //       pyshell.send(data);

                // //       pyshell.on('message', function (message) {
                // //         // result = JSON.parse(message);
                // //         result = message;
                // //       });

                // //       pyshell.on('stderr', function (stderr) {
                // //         console.log(stderr);
                // //       });

                // //       pyshell.end(function (err, code, signal) {
                // //         if (err) reject(err);
                // //         console.log('The exit code was: ' + code);
                // //         console.log('The exit signal was: ' + signal);
                // //         console.log('finished');
                // //         resolve(result);
                // //       });
                // //     });
                // //   }