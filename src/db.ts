import {Pool} from 'pg';

const connectionString = 'postgres://srrdjtnc:IN8kgb_uCjNbRHj6Xp4SrxEtArA6DECr@kesavan.db.elephantsql.com/srrdjtnc';
const db = new Pool({connectionString});

export default db;