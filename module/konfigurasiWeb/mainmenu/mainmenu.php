<?php 
#Author			: Abu Dzakiyyah
#Created			: 28 November 2016, 00:54:00
#File Name		: mainmenu.php
#Description		: Manajemen Menu Utama
?>
<section class="content" style="padding-left: 0px; padding-right: 0px; padding-bottom: 0px;">
<div class="row">
<div class="col-md-4">
<div class="box box-primary" style="margin-bottom: 0px;">
            <div class="box-header with-border">
              <h3 class="box-title">Tambah Menu</h3>
            </div>
            <!-- /.box-header -->
            <!-- form start -->
            <form role="form" id="formMainMenu" name="formMainMenu" method="POST">
              <div class="box-body">
                <div class="form-group">
                  <label for="mainMenuNama">Nama Menu</label>
					<div class="input-group">
					<span class="input-group-addon"><i class="fa fa-bars"></i></span>
					<input class="form-control" placeholder="Nama Menu" type="text" name="mainMenuNama" required data-msg="Masukkan Nama Menu">
				  </div>
                </div>
				<div class="form-group">
                  <label for="mainMenuUrl">Link Menu</label>
					<div class="input-group">
					<span class="input-group-addon"><i class="fa fa-link"></i></span>
					<input class="form-control" placeholder="Link Menu" type="text" name="mainMenuUrl">
				  </div>
                </div>
				<div class="form-group">
                  <label for="mainMenuIcon">Icon Menu</label>
					<div class="input-group">
					<span class="input-group-addon"><i class="fa fa-smile-o"></i></span>
					<input class="form-control" placeholder="Icon Menu" type="text" name="mainMenuIcon">
				  </div>
                </div>
				<div class="form-group">
					<label for="mainMenuAktif">Menu Aktif</label>
					<div class="input-group">
						<label class="switch">
						<input  type="checkbox" class="switch-input" name="mainMenuAktif">
						<span class="switch-label" data-on="Yes" data-off="No"></span>
						<span class="switch-handle"></span>
						</label>
					</div>
				</div>
				
				<div class="form-group">
					<label for="mainMenuLevel">Level:</label>
					<div class="input-group">
						<span class="input-group-addon"><i class="fa fa-users"></i></span>
						<select class="form-control  selectpicker show-menu-arrow" name="mainMenuLevel" data-style="btn-default">
							<option data-icon="fa fa-user" value="administrator" >Administrator</option>
							<option data-icon="fa fa-user" value="kasir" >Kasir</option>
							<option data-icon="fa fa-user" value="pengadaan" >Pengadaan</option>
							<option data-icon="fa fa-user" value="owner" >Owner</option>
						</select>
					</div>
				</div>
				<div class="form-group">
                  <label for="mainMenuUrutan">Urutan Menu</label>
					<div class="input-group">
					<span class="input-group-addon"><i class="fa fa-sort"></i></span>
					<input class="form-control" placeholder="Urutan Menu" type="text" name="mainMenuUrutan">
				  </div>
                </div>
				<div class="form-group">
                  <label for="mainMenuNama">Menu Keterangan / Info</label>
					<div class="input-group">
					<span class="input-group-addon"><i class="fa fa-info"></i></span>
					<textarea class="form-control" placeholder="Menu Keterangan / Info" name="mainMenuInfo" style="resize:none;"></textarea>
				  </div>
                </div>
                
              </div>
              <!-- /.box-body -->

              <div class="box-footer">
				<button type="reset" class="btn btn-danger">Reset <i class="fa fa-ban"></i></button>
				<button type="submit" class="btn btn-primary pull-right">Simpan <i class="fa fa-save"></i></button>
              </div>
            </form>
          </div>
</div>
<div class="col-md-8">
<div class="box box-primary" style="margin-bottom: 0px;">
          
			<div class="box-body">
				<table id="mainMenuTable" class="table table-bordered table-hover">
                <thead>
                <tr>
                  <th >No</th>
                  <th>Nama Menu</th>
                  <th>Icon Menu</th>
                  <th>Level</th>
                  <th>Aktif</th>
				  <th>Aksi</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>1</td>
                  <td>Internet
                    Explorer 4.0
                  </td>
                  <td>Win 95+</td>
                  <td> 4</td>
                  <td>X</td><td>U</td>
                </tr>
                
                <tr>
                  <td>1</td>
                  <td>PSP browser</td>
                  <td>PSP</td>
                  <td>-</td>
                  <td>C</td><td>U</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>All others</td>
                  <td>-</td>
                  <td>-</td>
                  <td>U</td><td>U</td>
                </tr>
                </tbody>
              </table>
			</div>
			
</div> 
 </div>			

</div></section>
<style type="text/css">
   .bootstrap-select .btn:focus {
		outline: none !important;
	}
	.bootstrap-select .btn{
		max-width:513px;
		border-radius:0px !important;
	}
</style>
<script type="text/javascript">
	$.validator.setDefaults({
	submitHandler: function() {
			console.log($("#formMainMenu").serialize());	
		}
	});
	
     $(function () {
		$('#formMainMenu').validate();
		$('#mainMenuTable').DataTable({
		  "paging": true,
		  "lengthChange": false,
		  "searching": true,
		  "ordering": false,
		  "info": true,
		  "autoWidth": true,
		  "language": {
							"emptyTable":     "Tidak ada data",
							"info":           "Menampilkan _START_ sampai _END_ dari _TOTAL_ data",
							"infoEmpty":      "Menampilkan 0 sampai 0 dari 0 data",
							"infoFiltered":   "(total _MAX_ data)",
							"infoPostFix":    "",
							"thousands":      ",",
							"lengthMenu":     "Show _MENU_ entries",
							"loadingRecords": "Memuat data...",
							"processing":     "Memproses data...",
							"search":         "Cari:",
							"zeroRecords":    "Data tidak ditemukan :)",
							"paginate": {
								"first":      "First",
								"last":       "Last",
								"next":       "<i class=\"fa fa-angle-double-right\"></i>",
								"previous":   "<i class=\"fa fa-angle-double-left\"></i>"
							}
				  }
		});
		$('.selectpicker').selectpicker();
  });
</script>
