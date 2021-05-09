const Helpers = (() => {
  const ShowAlert = (alertType, allertMessage) => {
    setAlertMessage(alertType, allertMessage);
    $("#galleryAlert")
      .fadeTo(3000, 500)
      .slideUp(500, () => {
        $("#galleryAlert").slideUp(500);
      });
  };

  const setAlertMessage = (alertType, allertMessage) => {
    $("#galleryAlert").removeClass();
    $("#galleryAlert").addClass(
      `alert alert-${alertType.toLowerCase()} alert-dismissible fade in show sticky-top`
    );
    $("#galleryAlert").html(`
            <strong>${alertType}!</strong> ${allertMessage}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true" onclick="this.parentElement.parentElement.style.display='none';">&times;</span>
            </button>
        `);
  };

  return {
    ShowAlert,
  };
})();
