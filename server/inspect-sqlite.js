import sqlite3 from 'sqlite3'

const sqlite = sqlite3.verbose()
const db = new sqlite.Database('./crm_database.sqlite', sqlite.OPEN_READONLY, (err) => {
  if (err) {
    console.error('DB open error:', err.message)
    process.exit(1)
  }

  db.all("SELECT name, type, sql FROM sqlite_master WHERE type IN ('table','index') ORDER BY type, name", (err, rows) => {
    if (err) {
      console.error('Schema query error:', err.message)
      process.exit(1)
    }

    console.log('--- SQLITE SCHEMA ---')
    rows.forEach((row) => {
      console.log(`${row.type.toUpperCase()}: ${row.name}`)
    })
    console.log('--- END SCHEMA ---')

    db.all("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'", (err, tables) => {
      if (err) {
        console.error('Table query error:', err.message)
        process.exit(1)
      }

      if (tables.length === 0) {
        console.log('No user tables found.')
      }

      let pending = tables.length
      tables.forEach((t) => {
        db.get(`SELECT COUNT(*) AS count FROM ${t.name}`, (err2, c) => {
          if (err2) {
            console.error('Count error', t.name, err2.message)
          } else {
            console.log(`TABLE ${t.name} COUNT=${c.count}`)
          }
          pending -= 1
          if (pending === 0) db.close()
        })
      })
    })
  })
})
