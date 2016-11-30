<script type="text/javascript">
  var batang = c3.generate({
		bindto: '#batang',
        data: {
		 x: 'kolom',
          columns: [
            ['kolom', "Januari", "Februari", "Maret", "April", "Mei", "Juni"],
			['Order', 1030, 1200, 1100, 1400, 1150, 1250],
			['Penjualan', 2130, 2100, 2140, 2200, 2150, 1850],
			['Pengunjung', 130, 100, 140, 200, 150, 0],
			['Pelanggan', 30, 200, 100, 400, 150,9]
          ],
		  type: 'bar',
		    // line,  spline,step,area,area-spline,area-step,bar,scatter,pie,donut , gauge
		   /*
		   types: {
				Penjualan: 'bar',
				Order: 'spline',
				Pengunjung: 'area-spline',
				Pelanggan: 'area-step'
			  },
		   */
		  //order: 'null', // asc,null,desc
		  labels: false,
		  colors: {
            //Order: '#ff0000',
            //Penjualan: '#00ff00',
            //Pelanggan: '#0000ff'
          },
          //onclick: function (d, element) { console.log("onclick", d, element); },
         // onmouseover: function (d) { console.log("onmouseover", d); },
         // onmouseout: function (d) { console.log("onmouseout", d); }
        },
		tooltip: {
			format: {
					//title: function (d) { return 'Data ' + d; },
					value: function(value,ration,id){
						if(id=="Order" || id=="Penjualan")
						{
							return value.toLocaleString(['ban', 'id'])+" Transaksi";
						}
						else if(id=="Pengunjung" || id=="Pelanggan")
						{
							return value.toLocaleString(['ban', 'id'])+" User";
						}
						else{
							return value.toLocaleString(['ban', 'id']);
						}
					}
				}
		},
        axis: {
          x: {
            type: 'categorized',
			/*
			label: {
                text: 'X Label',
                position: 'outer-center'
                // inner-right : default
                // inner-center
                // inner-left
                // outer-right
                // outer-center
                // outer-left
            }
			 */
          },
		  y : {
            label: {
                text: 'Statistik Toko Online Dzakiyyah',
                position: 'outer-middle'
                // inner-top : default
                // inner-middle
                // inner-bottom
                // outer-top
                // outer-middle
                // outer-bottom
				}
				/*
				//Jika Menggunakan Format Mata Uang Indonesia
				,tick:{
					format: function (x) 
					{
						return "Rp " + x.toLocaleString(['ban', 'id']) ; 
					}
				}
				*/
				,tick:{
					format: function (x) 
					{
						return x.toLocaleString(['ban', 'id']) ; 
					}
				}
			}
        },
        bar: {
          width: {
            ratio: 0.2,
            //max: 30
          }
        },
		grid: {
        x: {
            show: false
        },
        y: {
            show: true
        }
    }
      });


var garis = c3.generate({
	bindto: '#garis',
    data: {
        columns: [
            ['data1', 30, 200, 100, 400, 150, 250],
            ['data2', 50, 20, 10, 40, 15, 25]
        ]
    }
});


var donat = c3.generate({
	bindto: '#donat',
    data: {
        columns: [
            ['data1', 30],
            ['data2', 120],
        ],
        type : 'donut'
    },
    donut: {
        title: "Donat Mungil"
    }
});

var pizza = c3.generate({
	bindto: '#pizza',
    data: {
        columns: [
            ["setosa", 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2],
            ["versicolor", 1.4, 1.5, 1.5, 1.3, 1.5, 1.3, 1.6, 1.0, 1.3, 1.4, 1.0, 1.5, 1.0, 1.4, 1.3, 1.4, 1.5, 1.0, 1.5, 1.1, 1.8, 1.3, 1.5, 1.2, 1.3, 1.4, 1.4, 1.7, 1.5, 1.0, 1.1, 1.0, 1.2, 1.6, 1.5, 1.6, 1.5, 1.3, 1.3, 1.3, 1.2, 1.4, 1.2, 1.0, 1.3, 1.2, 1.3, 1.3, 1.1, 1.3],
            ["virginica", 2.5, 1.9, 2.1, 1.8, 2.2, 2.1, 1.7, 1.8, 1.8, 2.5, 2.0, 1.9, 2.1, 2.0, 2.4, 2.3, 1.8, 2.2, 2.3, 1.5, 2.3, 2.0, 2.0, 1.8, 2.1, 1.8, 1.8, 1.8, 2.1, 1.6, 1.9, 2.0, 2.2, 1.5, 1.4, 2.3, 2.4, 1.8, 1.8, 2.1, 2.4, 2.3, 1.9, 2.3, 2.5, 2.3, 1.9, 2.0, 2.3, 1.8],
        ],
        type : 'pie'
    }
});

var areaspline = c3.generate({
	bindto:'#areaspline',
    data: {
        columns: [
            ['data1', 30, 200, 100, 400, 150, 250],
            ['data2', 130, 100, 140, 200, 150, 50]
        ],
        type: 'area-spline'
    }
});
  
  var steparea = c3.generate({
	bindto:'#steparea',
    data: {
        columns: [
            ['data1', 300, 350, 300, 0, 0, 100],
            ['data2', 130, 100, 140, 200, 150, 50]
        ],
        types: {
            data1: 'step',
            data2: 'area-step'
        }
    }
});

var skatter = c3.generate({
	bindto:'#skatter',
    data: {
        xs: {
            setosa: 'setosa_x',
            versicolor: 'versicolor_x',
        },
        // iris data from R
        columns: [
            ["setosa_x", 3.5, 3.0, 3.2, 3.1, 3.6, 3.9, 3.4, 3.4, 2.9, 3.1, 3.7, 3.4, 3.0, 3.0, 4.0, 4.4, 3.9, 3.5, 3.8, 3.8, 3.4, 3.7, 3.6, 3.3, 3.4, 3.0, 3.4, 3.5, 3.4, 3.2, 3.1, 3.4, 4.1, 4.2, 3.1, 3.2, 3.5, 3.6, 3.0, 3.4, 3.5, 2.3, 3.2, 3.5, 3.8, 3.0, 3.8, 3.2, 3.7, 3.3],
            ["versicolor_x", 3.2, 3.2, 3.1, 2.3, 2.8, 2.8, 3.3, 2.4, 2.9, 2.7, 2.0, 3.0, 2.2, 2.9, 2.9, 3.1, 3.0, 2.7, 2.2, 2.5, 3.2, 2.8, 2.5, 2.8, 2.9, 3.0, 2.8, 3.0, 2.9, 2.6, 2.4, 2.4, 2.7, 2.7, 3.0, 3.4, 3.1, 2.3, 3.0, 2.5, 2.6, 3.0, 2.6, 2.3, 2.7, 3.0, 2.9, 2.9, 2.5, 2.8],
            ["setosa", 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2],
            ["versicolor", 1.4, 1.5, 1.5, 1.3, 1.5, 1.3, 1.6, 1.0, 1.3, 1.4, 1.0, 1.5, 1.0, 1.4, 1.3, 1.4, 1.5, 1.0, 1.5, 1.1, 1.8, 1.3, 1.5, 1.2, 1.3, 1.4, 1.4, 1.7, 1.5, 1.0, 1.1, 1.0, 1.2, 1.6, 1.5, 1.6, 1.5, 1.3, 1.3, 1.3, 1.2, 1.4, 1.2, 1.0, 1.3, 1.2, 1.3, 1.3, 1.1, 1.3],
        ],
        type: 'scatter'
    },
    axis: {
        x: {
            label: 'Sepal.Width',
            tick: {
                fit: false
            }
        },
        y: {
            label: 'Petal.Width'
        }
    }
});
</script>
<br/>
<div class="box box-warning">
            <div class="box-header with-border">
              <h3 class="box-title">Diagram Batang (Bar)</h3>

              <div class="box-tools pull-right">
                <button data-widget="collapse" class="btn btn-box-tool" type="button"><i class="fa fa-minus"></i>
                </button>
              </div>
              <!-- /.box-tools -->
            </div>
            <!-- /.box-header -->
            <div class="box-body" style="display: block;">
             <div id="batang" style="height:250px"></div>
            </div>
            <!-- /.box-body -->
 </div>
 
 <div class="box box-warning">
            <div class="box-header with-border">
              <h3 class="box-title">Diagram Garis (Line)</h3>

              <div class="box-tools pull-right">
                <button data-widget="collapse" class="btn btn-box-tool" type="button"><i class="fa fa-minus"></i>
                </button>
              </div>
              <!-- /.box-tools -->
            </div>
            <!-- /.box-header -->
            <div class="box-body" style="display: block;">
             <div id="garis" style="height:250px"></div>
            </div>
            <!-- /.box-body -->
 </div>

  <div class="box box-warning">
            <div class="box-header with-border">
              <h3 class="box-title">Diagram Donat (donut)</h3>

              <div class="box-tools pull-right">
                <button data-widget="collapse" class="btn btn-box-tool" type="button"><i class="fa fa-minus"></i>
                </button>
              </div>
              <!-- /.box-tools -->
            </div>
            <!-- /.box-header -->
            <div class="box-body" style="display: block;">
             <div id="donat" style="height:250px"></div>
            </div>
            <!-- /.box-body -->
 </div>
 <div class="box box-warning">
            <div class="box-header with-border">
              <h3 class="box-title">Diagram Pizza (pie)</h3>

              <div class="box-tools pull-right">
                <button data-widget="collapse" class="btn btn-box-tool" type="button"><i class="fa fa-minus"></i>
                </button>
              </div>
              <!-- /.box-tools -->
            </div>
            <!-- /.box-header -->
            <div class="box-body" style="display: block;">
             <div id="pizza" style="height:250px"></div>
            </div>
            <!-- /.box-body -->
 </div>
 <div class="box box-warning">
            <div class="box-header with-border">
              <h3 class="box-title">Diagram Area Spline (area-spline)</h3>

              <div class="box-tools pull-right">
                <button data-widget="collapse" class="btn btn-box-tool" type="button"><i class="fa fa-minus"></i>
                </button>
              </div>
              <!-- /.box-tools -->
            </div>
            <!-- /.box-header -->
            <div class="box-body" style="display: block;">
             <div id="areaspline" style="height:250px"></div>
            </div>
            <!-- /.box-body -->
 </div>
<div class="box box-warning">
            <div class="box-header with-border">
              <h3 class="box-title">Diagram Step (Step)</h3>

              <div class="box-tools pull-right">
                <button data-widget="collapse" class="btn btn-box-tool" type="button"><i class="fa fa-minus"></i>
                </button>
              </div>
              <!-- /.box-tools -->
            </div>
            <!-- /.box-header -->
            <div class="box-body" style="display: block;">
             <div id="steparea" style="height:250px"></div>
            </div>
            <!-- /.box-body -->
 </div>
 <div class="box box-warning">
            <div class="box-header with-border">
              <h3 class="box-title">Diagram Scatter (Scatter)</h3>

              <div class="box-tools pull-right">
                <button data-widget="collapse" class="btn btn-box-tool" type="button"><i class="fa fa-minus"></i>
                </button>
              </div>
              <!-- /.box-tools -->
            </div>
            <!-- /.box-header -->
            <div class="box-body" style="display: block;">
             <div id="skatter" style="height:250px"></div>
            </div>
            <!-- /.box-body -->
 </div>
