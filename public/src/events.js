const Events = (() => {
  const SubmitSelectedPhotos = () => {
    if (!App.SelectedImageList || App.SelectedImageList == null || App.SelectedImageList.length == 0 ){
        Helpers.ShowAlert("Warning", "You don't have selected images. Please select your favourite images to your grid first.");
        return;
    }
    if (App.IsFoundSelectedPhotos) 
        UpdateSelectedPhotos();
    else 
        SaveSelectedPhotos();
  };

  const FetchAllPhotosButtonClick = () => {
    PhotoGrid.BuildMainPhotoGrid(App.Code);
  };

  const SaveSelectedPhotos = () => {
    const data = {
      code: App.Code,
      photoGallery: App.SelectedImageList,
    };
    HttpClient.Request("post", "json", `/api/gallery`, data)
      .done((response) => {
        if (response && response.error) {
          console.log(response);
          Helpers.ShowAlert("Danger", "Your selected photos are failed to add.");
        }
        App.IsFoundSelectedPhotos = true;
        Helpers.ShowAlert("Success", "Your selected photos are successfully added.");
      })
      .fail((error) => {
        console.log(error);
      });
  };

  const UpdateSelectedPhotos = () => {
    const data = {
      code: App.Code,
      photoGallery: App.SelectedImageList,
    };
    HttpClient.Request("put", "json", `/api/gallery/${App.Code}`, data)
      .done((response) => {
        if (response && response.error) {
          console.log(response);
          Helpers.ShowAlert("Danger","Your selected photos are failed to updated.");
        }
        Helpers.ShowAlert("Success", "Your selected photos are successfully updated.");
      })
      .fail((error) => {
        console.log(error);
      });
  };

  return {
    SubmitSelectedPhotos,
    FetchAllPhotosButtonClick,
  };
})();
