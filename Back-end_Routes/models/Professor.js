const {query} = require ('../config/db')

class Professor{
    static async getAll(){
        const result = await query(
            'SELECT * FROM public.professor'
            //'SELECT id as codigo, nome as nomeprofessor, email as emailprofessor FROM public.professor'
        )
        return result.rows
    }

    static async getById(id){
        const result = await query(
            'SELECT * FROM public.professor where id =$1', [id]
        )
    }

    static async insert({nome,email}){

        const result = await query(
            'INSERT INTO public.professor(nome,email) VALUES ($1,$2) RETURNING *', [nome, email]
        )
        return result.rows[0]
    }

    static async update(id, nome, email){
        const result = await query(
            'UPDATE public.professor SET nome=$2, email=$3 WHERE id = $1 RETURNING *', [id, nome, email]
        )
        return result.rows[0]
    }

    static async delete(id){
        const result = await query(
            'DELETE FROM professor WHERE id=$1 RETURNING *',[id]
        )
        return result.rows[0]
    }
}

module.exports = Professor