

const removeOnAnimationsCompleted = (elem) => {
  Promise.all(
    elem.getAnimations().map(
      function (animation) {
        return animation.finished
      }
    )
  ).then(
    function () {
      return elem.remove();
    }
  )
}