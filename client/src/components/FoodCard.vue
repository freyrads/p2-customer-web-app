<script></script>

<template>
  <div class="card food r10">
    <div class="image">
      <img class="r10" src="https://www.leseclaireuses.com/ec_content/couv/20210225_20210225_istock-1044435778.jpg" alt="kebeb" style="width: 200px;" >
    </div>
    <div class="description">
      <div class="yellow-btn">appetizer</div>
    </div>
  </div>
</template>

<style>
div.card {
  box-shadow: 0px 0px 4px 0px black;
  width: fit-content;
}

.r10 {
  border-radius: 10px;
}

div.card .image {
  max-height: 150px;
}

div.card .image img {
  border-radius: 10px 10px 0px 0px;
}

div.card .description {
  background-color: white;
  width: 100%;
  border-radius: 0px 0px 10px 10px;
}

div.card .description .yellow-btn {
  padding: 6px 12px;
  background-color: orange;
  width: fit-content;
  font-weight: bold;
  color: white;
  margin: 10px 20px;
  border-radius: 20px;
}
</style>
