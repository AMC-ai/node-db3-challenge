const db = require("../data/db-config.js");

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove,
    addStep
};

function find() {
    return db('schemes')
};

function findById(id) {
    return db('schemes')
        .where({ id })
        .first();
};

/*
select  sc.id
, st.instructions as [Devious Plan]
, sc.scheme_name as Scheme
from schemes as sc
join steps as st
on st.scheme_id = sc.id
where scheme_id = 1;
*/

function findSteps(scheme_id) {
    return db('schemes as sc')
        .select('sc.scheme_name as Scheme', 'sc.id', 'st.instructions as [Devious Plan]')
        .join("steps as st", "st.scheme_id", "sc.id")
        .where('scheme_id', scheme_id)
        .orderBy('st.step_number');
};

/*
async function add (scheme){
    const [id]= await db('schemes').insert(scheme);
    return findById(id)
}
*/

function add(scheme) {
    return db('schemes')
        .insert(scheme, "id")
        .then(ids => {
            const [id] = ids;

            return findById(id);
        });
};



function update(changes, id) {
    return db('schemes')
        .update(changes)
        .where({ id })
        .then(id => {
            return findById(id);

        });
};



function remove(id) {
    return db('schemes')
        .where({ id })
        .del()

        .then(ids => {
            return ({ message: `Scheme ${id} removed` });
        });
};

function addStep(step, scheme_id) {
    return db('steps')
        .insert(step, scheme_id)
        .where({ scheme_id })
        .then(ids => {
            const [id] = ids;

            return findById(id);
        });
};

// function addStep(step, scheme_id) {
//     const { step_number, instructions } = step
//     return db('steps').insert({ step_number, instructions}).then(([id]) => findStepById(id))
// }

// function removeStep(schemeId, stepNumber) {
//     return db('steps')
//     .where({scheme_id: schemeId})
//     .andWhere({step_number: stepNumber})
//     .delete()
// } 