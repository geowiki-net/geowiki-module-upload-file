import Window from 'modulekit-window'

const uploadedDataSources = []

module.exports = {
  id: 'upload-file',
  appInit (app) {
    app.on('list-data-sources', promises => {
      promises.push(new Promise(resolve => {
        const item = {
          id: '_upload' + uploadedDataSources.length,
          title: '<Local file>',
          loader: () => new Promise((resolve, reject) => {
            showDialog((err, url, name) => {
              item.title = name + ' (Local)'
              uploadedDataSources.push(item)

              resolve(url)

              app.refresh()
            })
          })
        }

        resolve(uploadedDataSources.concat([item]))
      }))
    })
  }
}

function showDialog (callback) {
  const win = new Window({
    title: 'Select file'
  })

  const input = document.createElement('input')
  input.type = 'file'
  win.content.appendChild(input)
  win.show()

  input.onchange = () => {
    let reader = new FileReader()
    reader.onload = (e) => {
      const url = e.target.result
      win.close()
      callback(null, url, input.files[0].name)
    }

    reader.readAsDataURL(input.files[0])
  }
}
