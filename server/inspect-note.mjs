import sqlite3 from 'sqlite3'

const sqlite = sqlite3.verbose()
const db = new sqlite.Database('./crm_database.sqlite', sqlite.OPEN_READONLY, (err) => {
  if (err) {
    console.error('DB open error:', err.message)
    process.exit(1)
  }

  db.get("SELECT id, name, notes FROM Leads WHERE id = 1", (err, row) => {
    if (err) {
      console.error('Query error:', err.message)
      process.exit(1)
    }
    console.log('Lead 1 notes:', row)
    db.close()
  })
})
