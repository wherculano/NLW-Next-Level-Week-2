const Database = require("./db")
const createProffy = require("./createProffy")

Database.then(async(db) => {
    //Inserir dados
    proffyValue = {
        name: "Wagner Herculano",
        avatar: "https://avatars0.githubusercontent.com/u/26460999?s=460&u=6cd1f32e88ae5c240a1041bb6ef9ef8f449ab6ea&v=4",
        whatsapp: "(00)000000000",
        bio: "Estudante da linguagem Python há um pouco mais de 2 anos e se aventurando nos estudos de Back end com outras linguagens também.",
    }

    classValue = {
        subject: 1,
        cost: "20",
        //o proffy_id virá pelo banco de dados
    }
    classScheduleValues = [
            //o class_id virá pelo banco de dados após cadastrarmos a class
            {
                weekday: 1, //segunda
                time_from: 720, //segundos
                time_to: 1220 //segundos}
            }, {
                weekday: 0, //domingo
                time_from: 900, //segundos
                time_to: 1800 //segundos}
            }
        ]
        //await createProffy(db, { proffyValue, classValue, classScheduleValues })

    //consultar dados inseridos
    //consultar os proffys
    const selectedProffys = await db.all("SELECT * FROM proffys")

    // consultar as classes de um determinado professor
    // e trazer junto os dados do professor
    const selectedClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
        //console.log(selectedClassesAndProffys)

    // o horario que o professor trabalha, por exemplo, é das 8h às 18h
    // o horario do time_from (8h) precisa ser menor ou igual ao horario solicitado
    // e o time_to precisa ser  menor ao solicitado
    const selectClassSchedules = await db.all(`
    SELECT class_schedule.*
    FROM class_schedule
    WHERE class_schedule.class_id = 1
    AND class_schedule.weekday = "0"
    AND class_schedule.time_from <= "900"
    AND class_schedule.time_to > "900"
    `)
    console.log(selectClassSchedules)
})