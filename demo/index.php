<!doctype html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">

<title>nInputFile</title>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.4.1/jquery.fancybox.min.css">
<link rel="stylesheet" href="../dst/jquery.nInputFile.css">
<link rel="stylesheet" href="demo.css" />
<style>
.wrapper_1 {
  overflow: hidden;
  width: 100%;
}

</style>

<!-- <script src=""></script> -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore-min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone-min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.4.1/jquery.fancybox.min.js"></script>

<script src="../dst/jquery.nInputFile.min.sourcemap.js"></script>

</head>
<body>

<div class="wrapper_1">


<h1><a href="./">nInputFile</a></h1>

<?php
echo '<p>hoge</p>';
if( isset( $_POST ) ){
  echo '<p>$_POST</p>';
  echo '<pre>';
  var_dump( $_POST );
  echo '</pre>';
  if( isset( $_POST['images'] ) ){
    echo '<div class="list_1"><div class="list_1__items">';
    foreach( $_POST['images'] as $src ){
      echo <<<EOM
<div class="list_1__item">
  <div class="add_file_1 is_result">
    <a href="{$src}" data-fancybox="group2">
      <img src="{$src}" alt="" />
    </a>
  </div>
</div>
EOM;
    }
    echo '</div></div>';
  }
}
if( isset( $_FILES ) ){
  echo '<p>$_FILES</p>';
  echo '<pre>';
  var_dump( $_FILES );
  echo '</pre>';
}
?>

<hr></hr>


<form id="form" action="./" method="post" enctype="multipart/form-data">
  
  <div class="list_1 js_input_img_1">
    <input type="file" accept="image/*" multiple="1">
    <div class="list_1__items js_items"></div>
  </div>
  
  <script>
  $(function(){
    
    var $input_img_1 = $(".js_input_img_1");
    if( $input_img_1.length ){
      
      nInputFile.template = _.extend(nInputFile.template, {
        input_img_1: _.template( $("#input_img_1_template").html() ),
        input_img_1__result: _.template( $("#input_img_1__result_template").html() )
      });
      
      $input_img_1.each(function(index,el){
        new nInputFile.InputImg1({
          el: el,
          collection: new nInputFile.InputImg1_Collection(),
          min: 2
        });
      });
      
      $("[data-fancybox]").fancybox();
    }
    
  });
  </script>
  
  <br />
  
  <button type="submit">値を確認する</button>
  
</form><!-- /#form -->


</div><!-- /.wrapper_1 -->


<script id="input_img_1_template" type="text/template">
  <div class="list_1__item js_model" data-cid="<%- cid %>">
    <div class="add_file_1 is_default">
      <p>画像</p>
    </div>
  </div>
</script>

<script id="input_img_1__result_template" type="text/template">
  <div class="add_file_1 is_result">
    <a href="<%- result %>" data-fancybox="group" data-caption="<%- cid %>">
      <img src="<%- result %>" alt="" />
    </a>
    <div class="add_file_1__remove js_remove" data-cid="<%- cid %>"></div>
  </div>
  <input type="text" name="images[]" value="<%- result %>"></input>
</script>


</body>
</html>