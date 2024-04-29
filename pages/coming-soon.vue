<template>
  <div id="app">
	<div class="wrapper">
				
			<div class="container-fluid" id="body-container-fluid">
				<div class="container">

						
						
						<div class="jumbotron">
						<h1 class="display-1">
              <!-- <i class="fa  fa-spin fa-cog fa-3x"></i> -->
               <font-awesome-icon :icon="['fas', 'cog']" style="font-size:120px" />

             </h1>
						<h1 class="display-3">Coming Soon</h1>

                        <nuxt-link class="button" to="/"><i class="fa fa-home"></i>Home</nuxt-link>

						</div>

						 

				</div>
			</div>
				
			
			
		</div>
		</div>
</template>

<script>
export default {
//   layout: 'errors' // you can set a custom layout for the error page
}
</script>

<style scoped>
body {
/* background-image: url("../images/.jpg"); */
/* background-color:white; */
background-attachment:scroll;
background-repeat:no-repeat;
background-position:center;
background-size:cover;
line-height:5px; 
}
.display-1 {text-align:center;color:#e1b7b7;}
.display-1 .fa {animation:fa-spin 5s infinite linear;}
.display-3 {text-align:center;color:#df726a;}
.lower-case {text-align:center;}
 .button {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
    top: 50%;
  left: 50%;
}
</style>