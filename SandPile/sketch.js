canvas_s =400
grid = new Grid(20);
tab_color = [[191, 191, 255], [120, 121, 255], [73, 73, 255], [0, 0, 255]]
function setup(){
  createCanvas(canvas_s, canvas_s);
}
timer_counter = 0;
function draw() {
  background(220);
  timer_counter += 1;
  if(timer_counter > 1){
    grid.update();
    timer_counter = 0;
  }
  grid.draw();

  
}

function GridBox(x, y, s, id) {
  this.s = s;
  this.x = x;
  this.y = y;
  this.value = 0;
  this.id = id;
  this.draw = function draw(){
    fill(tab_color[this.value]);
    square(this.x, this.y, this.s);

  }
  this.update = function update(){
    this.value ++;
    if (this.value > 3){
      this.value = 0
      return true;
    }else{
      return false;
    }
  }
}

function Grid(size){
  this.size = size;
  this.boxes = [];
  this.flowing_boxes = [];
  box_size = canvas_s/this.size;
  this.flowing = false
  for (y = 0; y < this.size; y++) {
    for (x = 0; x < this.size; x++) {
        this.boxes.push(new GridBox(x*box_size, y*box_size, box_size, (x  + y * this.size)));
      }
  }
  
  this.draw = function draw(){
    for (i=0; i < this.boxes.length ; i++){
      this.boxes[i].draw();
    }
  }

  this.update = function update(){
    update_id = [];
    if (this.flowing){
      update_id= this.flowing_boxes;
    }else{
      update_id.push(Math.floor(Math.random() * this.boxes.length));
    }
    this.flowing = false;
    
    new_flowing_box = [];
    for(id_id=0; id_id < update_id.length; id_id++){
      id = update_id[id_id];

      if (this.boxes[id].update()){
        b_x = this.boxes[id].x / box_size
        b_y = this.boxes[id].y / box_size
        this.flowing = true;
        if (b_x + 1 < this.size){
          new_flowing_box.push((b_x+1) + b_y*this.size);
        }
        if (b_x - 1 >= 0){
          new_flowing_box.push((b_x-1) + b_y*this.size);
        }
        if (b_y + 1 < this.size){
          new_flowing_box.push((b_x) + (b_y+1)*this.size);
        }
        if (b_y - 1 >= 0){
          new_flowing_box.push((b_x) + (b_y-1)*this.size);
        }
      }
    }
    this.flowing_boxes = new_flowing_box;
    
  }
}