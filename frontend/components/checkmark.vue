<template>
  <div class="checkbox-container">
    <input type="checkbox" checked="checked" />
    <span class="checkmark"></span>
  </div>
</template>

<script>
export default {
  name: "Checkmark"
};
</script>

<style scoped lang="scss">
/* Customize the label (the container) */
.checkbox-container {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  /* Hide the browser's default checkbox */
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;

    /* When the checkbox is checked, add a blue background */
    &:checked ~ .checkmark {
      background-color: deepskyblue;
    }

    /* Show the checkmark when checked */
    &:checked ~ .checkmark:after {
      display: block;
    }
  }

  /* On mouse-over, add a grey background color */
  &:hover {
    input ~ .checkmark {
      background-color: #ccc;
    }
  }

  /* Create a custom checkbox */
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    border-radius: 5px;
    background-color: #00000007;
    border: 1px solid grey;

    /* Create the checkmark/indicator (hidden when not checked) */
    &:after {
      content: "";
      position: absolute;
      display: none;
    }

    /* Style the checkmark/indicator */
    &:after {
      left: 9px;
      top: 5px;
      width: 5px;
      height: 10px;
      border: solid white;
      border-radius: 2px;
      border-width: 0 3px 3px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  }
}
</style>
