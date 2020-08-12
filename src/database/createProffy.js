//a palavra async antes da função permite a utilização do await
module.exports = async function(db, {
    proffyValue,
    classValue,
    classScheduleValues
}) {
    //  inserir dados na tabela proffys
    const insertedProffy = await db.run(`
    INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
    ) VALUES (
        "${proffyValue.name}",
        "${proffyValue.avatar}",
        "${proffyValue.whatsapp}",
        "${proffyValue.bio}"
    );
    `)
        //o await só faz passar para a proxima instrução (proxima linha)
        //após instrução (db.run()) terminar de ser executada
    const proffy_id = insertedProffy.lastID

    //Inserir dados da tabela classes
    const insertedClass = await db.run(`
    INSERT INTO classes (
        subject,
        cost,
        proffy_id
    ) VALUES (
        "${classValue.subject}",
        "${classValue.cost}",
        "${proffy_id}"
    );
    `)
    const class_id = insertedClass.lastID

    //Inserir dados na tabela class_schedule
    const insertedAllClassScheduleValues = classScheduleValues.map((value) => {
            //map irá retornar um novo arra
            return db.run(`
        INSERT INTO class_schedule (
            class_id,
            weekday,
            time_from,
            time_to
        ) VALUES (
            "${class_id}",
            "${value.weekday}",
            "${value.time_from}",
            "${value.time_to}"
        );
        `)
        })
        // aqui vou executar todos os db.run() das class_schedules
    await Promise.all(insertedAllClassScheduleValues)
}