function showPage(pageName, clickedButton) {
    const views = document.querySelectorAll('.page-view');
    views.forEach(view => {
        view.classList.remove('active');
    });

    const buttons = document.querySelectorAll('.nav-button');
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });

    const selectedView = document.getElementById(`view-${pageName}`);
    if (selectedView) {
        selectedView.classList.add('active');
    }
    if (clickedButton) {
        clickedButton.classList.add('active');
    }
    