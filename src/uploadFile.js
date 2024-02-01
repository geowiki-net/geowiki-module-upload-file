module.exports = {
  id: 'upload-file',
  appInit (app) {
    app.on('list-data-sources', promises => {
      promises.push(new Promise(resolve => {
        const item = {
          id: 'upload1',
          title: '<Local file>',
          loader: () => new Promise((resolve, reject) => {
            item.title = 'Local file #1'
            resolve('data/test.osm')
          })
        }

        resolve(item)
      }))
    })
  }
}
