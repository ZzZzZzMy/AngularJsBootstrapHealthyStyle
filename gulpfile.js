/*
* @Author:Cadillac
* @Date:   2017-01-13 11:30:05
* @Last Modified by:   Cadillac zhou;
* @Last Modified time: 2017-01-13 12:20:19
*/
// 基础gulp模块

var gulp = require('gulp');
// webserver服务器模块
var webserver = require('gulp-webserver');
//监控
var watch = require('gulp-watch');
//队列模块
var sequence = require('gulp-watch-sequence');

/*
1.创建src(src是开发目录，所有操作都在src中进行)目录
2.在src新建index.html(因为我们现在做的是spa项目，所以，通过只有一个入口主文件)
3.实现index.html的文件复制操作，复制的目标是www
4.webserver的本地服务器配置(不是gulp-connect)
5.实现mock数据操作，先在根目录下创建mock目录，然后在目录里放置对应的json文件
	mock文件有skill.json/project.json/work.json，对应的接口地址配置为/api/skill,/api/project,/api/work
6.实现sass转换
7.实现js的模块化开发操作
*/
gulp.task('copy-index',function(){
	return gulp.src('./src/index.html')
	.pipe(gulp.dest('./www'));
});
//创建本地服务器任务
gulp.task('webserver', function() {
  gulp.src('./www')
    .pipe(webserver({
      livereload: false,
      directoryListing:false,
      open:true
      })); // end gulp
});
// index.css/main.scss--->www/css/index.css
// 通常我们主有一个入口的主文件index.scss/index.css
// @import 'xxx'
gulp.task('csstask',function(){
	return gulp.src('./src/css/**')
   /*.pipe(minifyCss())*/ //css 压缩
	.pipe(gulp.dest('./www/css'));
})
gulp.task('jstask',function(){
	return gulp.src('./src/js/**')
   /*.pipe(uglify())*/ // js丑化压缩
	.pipe(gulp.dest('./www/js'));
})
gulp.task('htmlTemplataTask',function(){
	return gulp.src('./src/template/**')
   /*.pipe(uglify())*/ // js丑化压缩
	.pipe(gulp.dest('./www/template'));
})
gulp.task('images',function(){
    return gulp.src(['./src/images/**.jpg','./src/images/**.gif','./src/images/**.png','./src/images/**.mp3','./src/images/**.svg'])
    .pipe(gulp.dest('./www/images'));
})
//监听操作
gulp.task('watch',function(){
	gulp.watch('./src/index.html',['copy-index']);
	gulp.watch('./src/js/**',['jstask']);
	gulp.watch('./src/css/**',['csstask']);
	gulp.watch('./src/template/**',['htmlTemplataTask']);

	//设置队列
	/*
	gulp.watch('./src/js/**',{
		name:"JS",
		emitOnGlob:false
	}, queue.getHandler('jstask'));

	watch('./src/css/**',{
		name:"CSS",
		emitOnGlob:false
	}, queue.getHandler('csstask'));*/
});
gulp.task('default',['webserver','watch'])
