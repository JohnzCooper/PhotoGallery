const PhotoGrid = (() => {
  const BuildSelectedPhotoGrid = (code) => {
    return new Promise((resolve, reject) => {
      HttpClient.Request("get", "json", `/api/v1/gallery/${code}`, null)
        .done((response) => {
          if (response && response.error) {
            console.log(response);
          }
          $("#btnFetchAllPhotos").show();
          App.IsFoundSelectedPhotos = true;
          response.photoGallery.forEach((photo, index) => {
            let image = {
              id: photo.id,
              picture: photo.picture,
            };
            App.SelectedImageList.push(image);
            BuildPhotoDiv("#selectedPhotoGrid",photo,"PhotoGrid.RemovePhotoInSelectedGrid(this)", index + 1);
          });
          return resolve();
        })
        .fail((error) => {
          return reject(error);
        });
    });
  };

  const BuildMainPhotoGrid = (code) => {
    HttpClient.Request("get", "json", `/api/v1/photos/${code}`, null)
    .done(response => {
      if (response && response.error) {
        console.log(response);
      }
      $("#btnFetchAllPhotos").hide();
      response.photoGallery.forEach(photo => {
        BuildPhotoDiv("#mainPhotoGrid", photo,"PhotoGrid.SelectPhotoFromMainGrid(this)");
        let imageBlock = document.querySelectorAll(`[data-imageID='${photo.id}']`);
        if(imageBlock.length > 1)
          imageBlock[0].style.opacity = 0.5;
      });
    })
    .fail(error => {
      console.log(error);
    });
}

const SelectPhotoFromMainGrid = (element) => {
    let image = {
      "id": element.dataset.imageid,
      "picture": element.src,
    }
    let imageIndex = App.SelectedImageList.findIndex(img => img.id === image.id);
    if(imageIndex === -1){
      if (App.SelectedImageList.length > 8) {
        Helpers.ShowAlert("Warning" , "You have already selected your best 9 photos.")
        return;
      }
      element.style.opacity = "0.5";
      App.SelectedImageList.push(image);
      BuildPhotoDiv("#selectedPhotoGrid", image,"PhotoGrid.RemovePhotoInSelectedGrid(this)", App.SelectedImageList.length);
    }
    else{
      element.style.opacity = "1";
      App.SelectedImageList.splice(imageIndex, 1);
      document.querySelectorAll(`[data-imageID='${image.id}']`)[1].parentElement.parentElement.remove()
    }
    ResetPosition();
  }

  const RemovePhotoInSelectedGrid = (element) => {
    let imageID = element.dataset.imageid;
    let imageIndex = App.SelectedImageList.findIndex(img => img.id === imageID);
    App.SelectedImageList.splice(imageIndex, 1);
    element.parentElement.parentElement.remove();
    let imageBlock = document.querySelectorAll(`[data-imageID='${imageID}']`)[0];
    ResetPosition();
    if(imageBlock)
      document.querySelectorAll(`[data-imageID='${imageID}']`)[0].style.opacity = 1;
}

const BuildPhotoDiv = (targetGrid, photo, onClickMethod, position) => {
    let positionShow = position == 0 ? "none" : position == null ? "none" : "block"
    $(targetGrid).append(`
    <div class="col-lg-4 col-md-4 col-6">
      <div class="d-flex justify-content-end">
        <span class="badge badge-secondary" style="display: ${positionShow};" id="position">${position}</span>
      </div>
      <a class="d-block mb-4 h-100">
          <img class="img-fluid img-thumbnail" data-imageID="${photo.id}" src="${photo.picture}"  alt="" onclick="${onClickMethod}">
      </a>
    </div>
    `)
}

const ResetPosition = () => {
  App.SelectedImageList.forEach((photo, index) => {
    //$(`img[data-imageID=${photo.id}]`).
    $('#selectedPhotoGrid').find(`img[data-imageID=${photo.id}]`).parent().parent().find('span').text(index + 1);
  });
}

return {
  BuildSelectedPhotoGrid,
  BuildMainPhotoGrid,
  BuildPhotoDiv,
  SelectPhotoFromMainGrid,
  RemovePhotoInSelectedGrid
}
})();
