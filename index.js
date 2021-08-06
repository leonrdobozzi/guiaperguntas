const express = require('express');
//Criando uma instancia do express
const app = express();
//Traduz os dados enviados pelo formulario para uma estrutura utilizavel no back-end
const bodyParser = require('body-parser');
//Importando a conexão
const connection = require('./database/database');
//Importanto o model
const Pergunta = require('./database/Pergunta');
const Resposta = require('./database/Resposta');
//Database
connection
    .authenticate()
    .then(() => {
        console.log('conexao feita com o banco de dados');
    })
    .catch((err)=> {
        console.log(err);
    })

//Estou dizendo para o express usar o EJS como View Engine
app.set('view engine', 'ejs');
//Dizendo para o express que quer usar arquivos estaticos, agora sempre que for utilizar o 
//arquivo voce pode colocar o caminho como /pasta/arquivo, não precisa indicar o caminho total
app.use(express.static('public'));
//Permite que a pessoa envie o dado e ele traduz para JS (Decodifica)
app.use(bodyParser.urlencoded({extended: false}));
//Traduz para JSON
app.use(bodyParser.json());

//Routes
app.get('/', (req,res) => {
    //O metodo findAll procura todos os itens na tabela e retorna para a gente
    //RAW: Faz uma busca crua no banco, ORDER: Ordena a busca crescente ou decrescente
    //Order tb pode ser por ordem alfabetica, se o caracter da coluna for text ou string
    Pergunta.findAll({raw: true, order:[['id','DESC']]}).then(perguntas => {
        //Renderizando um arquivo que está dentro da página views (Padrão EJS);
        res.render("index", {
            perguntas: perguntas
        });
    })
});

app.get('/perguntar', (req, res) => {
    res.render("perguntar");
});

//recebendo dados do formulario
app.post('/salvarpergunta', (req,res) => {
    let titulo = req.body.titulo;
    let descricao = req.body.descricao;
    //Para salvar um dado na tabela voce salva o model e faz o INSERT INTO com o 
    //metodo create do Sequelize
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        //Função de redirecionamento do express
        res.redirect('/');
    });
});
//Criando a rota de cada pergunta
app.get('/pergunta/:id', (req,res) => {
    let id = req.params.id;
    //ele busca apenas UM dado no banco
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){

            Resposta.findAll({
                where: {
                    perguntaId: pergunta.id,
                },
                order: [['id', 'DESC']]
            }).then(respostas => {
                res.render('pergunta',{
                    pergunta: pergunta,
                    respostas: respostas
                });
            })

        }else{
            res.redirect('/');
        }
    })
});

app.post('/responder', (req,res) => {
    let corpo = req.body.corpo;
    let perguntaId = req.body.pergunta;

    Resposta.create({
        corpo,
        perguntaId
    }).then(() => {
        res.redirect(`pergunta/${perguntaId}`);
    })
})

//Executando o servidor na porta 8080
app.listen(8000, () => {
    console.log('app rodando');
});