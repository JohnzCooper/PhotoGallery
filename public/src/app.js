const App = (() => {
  const Code = "CHhASmTpKjaHyAsSaauThRqMMjWanYkQ";
  const token = "YvlVLbj7mBm2WIHyQGO53A==";
  let selectedImageList = [];
  let isFoundSelectedPhotos = false;
  
  $(document).ready(function () {
    PhotoGrid.BuildSelectedPhotoGrid(Code)
      .catch(error => {
        if (error.status === 404) {
          PhotoGrid.BuildMainPhotoGrid(Code);
        }
      });
  });

  return {
    get SelectedImageList() {
      return selectedImageList;
    },
    get IsFoundSelectedPhotos() {
      return isFoundSelectedPhotos;
    },
    set IsFoundSelectedPhotos(value) {
      isFoundSelectedPhotos = value;
    },
    get Code() {
      return Code;
    },
    get Token() {
      return token;
    }
  }
})()