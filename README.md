projeto_web2 - Aplicativo Tem Razão - aplicação para reforçar exercicios de fração

Instrução para desenvolvedores:

back-end:

criar arquivo .env dentro da pasta backend.

PORT=4000

TEMRAZAO_FRONT_URL=http://localhost:3000

MAIL_TRANSPORT=smtps://email@provedor.com.br:senhaemail@smtp.gmail.com:465 (serviodr e porta smtp - exempo do smtp para conta google)

requisitos: Instalção do NodeJs e Mysql.

obs: O arquivo de dump do banco de dados encontra-se na pasta \backend\dump_banco

instalação $ yarn install

Running the app

start da aplicação
$ yarn run start

start modo de desenvolvimento
$ yarn run start:dev

start modo de produção
$ yarn run start:prod

acesse a aplicação com documentação swagger no navegador pelo endereço:
http://localhost:4000/docs/

front-end
Primeiros passos com Create React App
Este projeto foi inicializado com o aplicativo Create React .

Scripts Disponíveis
No diretório do projeto, você pode executar:

yarn start
Executa o aplicativo no modo de desenvolvimento.
Abra http: // localhost: 3000 para visualizá-lo no navegador.

A página será recarregada se você fizer edições.
Você também verá quaisquer erros de lint no console.

yarn test
Inicia o executor de teste no modo de observação interativo.
Consulte a seção sobre execução de testes para obter mais informações.

yarn build
Compila o aplicativo para produção na buildpasta.
Ele agrupa corretamente o React no modo de produção e otimiza a construção para o melhor desempenho.

A compilação é reduzida e os nomes dos arquivos incluem os hashes.
Seu aplicativo está pronto para ser implantado!

Consulte a seção sobre implantação para obter mais informações.
