<style>
	.index-left{
		position: fixed;
		top: 100px;
		left: 50%;
		margin-left: -400px;
	}
	.index-block{
		margin-bottom: 10px;
		overflow: hidden;
		border-radius: 2px;
		box-sizing: border-box;
		padding: 0 10px;
	}
	.item {
		margin-bottom: 10px;
	}
</style>
<template>
	<div class="index-left">
		<ul class="index-left-special index-block">
			<router-link to="/" tag="li" class="pointer">
				<el-tooltip class="item" effect="dark" content="推荐" placement="right-end">
						<el-button circle>
							<i class="el-icon-share"></i>
						</el-button>
				</el-tooltip>
			</router-link>

			<router-link to="/collection" tag="li" class="pointer">
				<el-tooltip class="item" effect="dark" content="关注" placement="right-end">
						<el-button icon="el-icon-star-on" circle></el-button>
				</el-tooltip>
			</router-link>
			
			<router-link to='/editor' tag="li" class="pointer">
				<el-tooltip class="item" effect="dark" content="写文章" placement="right-end">
						<el-button icon="el-icon-edit" circle></el-button>
				</el-tooltip>    
			</router-link>
		</ul>
		<div class="index-footer">
				
		</div>
	</div>
</template>
<script>
export default {
    data(){
        return{

        }
    }
}
</script>
