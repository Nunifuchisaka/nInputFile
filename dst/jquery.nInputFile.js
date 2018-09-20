/*!
  
  jquery.nInputFile.js
  
  Version: 0.1.0
  Author: Nunifuchisaka(nunifuchisaka@gmail.com)
  Website: http://nunifuchisaka.com/w/n-input-file/demo
  Repository: https://github.com/Nunifuchisaka/nInputFile
  
*/
;(function($, window, document, undefined){
"'use strict";
// File APIに対応しているか確認
if(window.File && window.FileReader && window.FileList && window.Blob) {

window.nInputFile = {};
nInputFile.template = {};



/*
## InputImg1
*/

var InputImg1_Model = Backbone.Model.extend({
  defaults: function(){
    return {
      fileData: null,
      value: null
    }
  }
});


nInputFile.InputImg1_Collection = Backbone.Collection.extend({
  model: InputImg1_Model
});


nInputFile.InputImg1 = Backbone.View.extend({
  
  initialize: function(opts){
    console.log("InputImg1");
    _.bindAll(this, "init2", "add_model", "changeFileData", "render", "click", "remove", "loadLocalImage");
    this.opts = _.extend({
      min: 2
    }, opts);
    
    this.$items = this.$(".js_items");
    this.$input = this.$("input[type='file']");
    
    this.collection.on("add", this.add_model);
    
    this.collection.on("change:fileData", this.changeFileData);
    this.collection.on("change:result", this.render);
    this.collection.on("remove", this.init2);
    
    this.init2();
    
    this.$input.change(this.loadLocalImage);
    //this.$el.on("change", "input[type='file']", this.loadLocalImage);
    this.$el.on("click", ".is_default", this.click);
    this.$el.on("click", ".js_remove", this.remove);
  },
  
  init2: function(){
    if( this.opts.min > this.collection.length ){
      //モデルの数が最小に満たないとき、最小まで追加する
      while( this.opts.min > this.collection.length ){
        this.collection.add({});
      }
    } else {
      //モデルが足りなくなったら追加する
      var last_model = this.collection.at(this.collection.length - 1);
      if( last_model.get("result") ){
        this.collection.add({});
      }
    }
  },
  
  add_model: function(model){
    var fileData = model.get("fileData");
    if( fileData ){
      var reader = new FileReader();
      reader.onload = function(){
        model.set(reader);
      }
      reader.readAsDataURL(fileData);
    }
    //
    var html = nInputFile.template.input_img_1({
      cid: model.cid,
      fileData: null
      //,value: JSON.stringify( model.toJSON() )
    });
    var $el = $(html);
    model.set({"$el": $el},{silent: true});
    this.$items.append($el);
  },
  
  changeFileData: function(model){
    console.group("changeFileData");
    console.log(model);
    var fileData = model.get("fileData");
    var reader = new FileReader();
    reader.onload = function(){
      model.set(reader);
    }
    reader.readAsDataURL(fileData);
    console.groupEnd();
  },
  
  render: function(model){
    console.group("render");
    console.log("model", model);
    var $el = model.get("$el");
    var data = model.toJSON();
    var args = _.extend(data, {
      cid: model.cid
    });
    console.log("args", args);
    console.log("fileData", args.fileData );
    var html = nInputFile.template.input_img_1__result(args);
    $el.find(".is_default").remove();
    $el.prepend(html);
    
    this.init2();
    console.groupEnd();
  },
  
  click: function(e){
    this.$input.click();
    return false;
  },
  
  remove: function(e){
    var $me = $(e.currentTarget),
        cid = $me.data("cid");
    var model = this.collection.get(cid);
    var $el = model.get("$el");
    $el.remove();
    this.collection.remove(model);
  },
  
  loadLocalImage: function(e){
    var self = this;
    console.log(e.target.files);
    //console.log(e.target.files);
    //this.collection.set(e.target.files);
    
    _.each(e.target.files, function(fileData){
      var emptyModel = self.collection.findWhere({"fileData": null});
      console.log("emptyModel", emptyModel);
      if( emptyModel ){
        emptyModel.set("fileData", fileData);
      } else {
        self.collection.add({
          "fileData": fileData
        });
      }
    });
    
    
    /*
    var fileData = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function(){
      console.log("reader", reader);
      model.set(reader);
    }
    reader.readAsDataURL(fileData);
    */
  }
  
});


} else {
  // File APIに対応していない場合
  console.log("File APIに対応していない");
}

})(jQuery, this, this.document);