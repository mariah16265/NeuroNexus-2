(function(g){var window=this;'use strict';var Cpb=function(a,b){g.U.call(this,{I:"button",Ma:["ytp-miniplayer-expand-watch-page-button","ytp-button","ytp-miniplayer-button-top-left"],W:{title:"{{title}}","data-tooltip-target-id":"ytp-miniplayer-expand-watch-page-button","aria-keyshortcuts":"i","data-title-no-tooltip":"{{data-title-no-tooltip}}"},V:[{I:"svg",W:{height:"24px",version:"1.1",viewBox:"0 0 24 24",width:"24px"},V:[{I:"g",W:{fill:"none","fill-rule":"evenodd",stroke:"none","stroke-width":"1"},V:[{I:"g",W:{transform:"translate(12.000000, 12.000000) scale(-1, 1) translate(-12.000000, -12.000000) "},
V:[{I:"path",W:{d:"M19,19 L5,19 L5,5 L12,5 L12,3 L5,3 C3.89,3 3,3.9 3,5 L3,19 C3,20.1 3.89,21 5,21 L19,21 C20.1,21 21,20.1 21,19 L21,12 L19,12 L19,19 Z M14,3 L14,5 L17.59,5 L7.76,14.83 L9.17,16.24 L19,6.41 L19,10 L21,10 L21,3 L14,3 Z",fill:"#fff","fill-rule":"nonzero"}}]}]}]}]});this.J=a;this.Ta("click",this.onClick,this);this.updateValue("title",g.gU(a,"Expand","i"));this.update({"data-title-no-tooltip":"Expand"});g.wb(this,g.eU(b.xc(),this.element))},Dpb=function(a){g.U.call(this,{I:"div",
S:"ytp-miniplayer-ui"});this.vg=!1;this.player=a;this.T(a,"minimized",this.Ch);this.T(a,"onStateChange",this.YR)},Epb=function(a){g.zV.call(this,a);
this.B=new g.PK(this);this.j=new Dpb(this.player);this.j.hide();g.tU(this.player,this.j.element,4);a.xg()&&(this.load(),g.Nu(a.getRootNode(),"ytp-player-minimized",!0))};
g.w(Cpb,g.U);Cpb.prototype.onClick=function(){this.J.Qa("onExpandMiniplayer")};g.w(Dpb,g.U);g.k=Dpb.prototype;
g.k.KO=function(){this.tooltip=new g.UX(this.player,this);g.L(this,this.tooltip);g.tU(this.player,this.tooltip.element,4);this.tooltip.scale=.6;this.Xc=new g.fW(this.player);g.L(this,this.Xc);this.Ck=new g.U({I:"div",S:"ytp-miniplayer-scrim"});g.L(this,this.Ck);this.Ck.Ea(this.element);this.T(this.Ck.element,"click",this.zJ);var a=new g.U({I:"button",Ma:["ytp-miniplayer-close-button","ytp-button"],W:{"aria-label":"Close"},V:[g.rG()]});g.L(this,a);a.Ea(this.Ck.element);this.T(a.element,"click",this.Up);
a=new Cpb(this.player,this);g.L(this,a);a.Ea(this.Ck.element);this.zv=new g.U({I:"div",S:"ytp-miniplayer-controls"});g.L(this,this.zv);this.zv.Ea(this.Ck.element);this.T(this.zv.element,"click",this.zJ);var b=new g.U({I:"div",S:"ytp-miniplayer-button-container"});g.L(this,b);b.Ea(this.zv.element);a=new g.U({I:"div",S:"ytp-miniplayer-play-button-container"});g.L(this,a);a.Ea(this.zv.element);var c=new g.U({I:"div",S:"ytp-miniplayer-button-container"});g.L(this,c);c.Ea(this.zv.element);this.BZ=new g.gX(this.player,
this,!1);g.L(this,this.BZ);this.BZ.Ea(b.element);b=new g.fX(this.player,this);g.L(this,b);b.Ea(a.element);this.nextButton=new g.gX(this.player,this,!0);g.L(this,this.nextButton);this.nextButton.Ea(c.element);this.Lj=new g.NX(this.player,this);g.L(this,this.Lj);this.Lj.Ea(this.Ck.element);this.Tc=new g.lX(this.player,this);g.L(this,this.Tc);g.tU(this.player,this.Tc.element,4);this.jJ=new g.U({I:"div",S:"ytp-miniplayer-buttons"});g.L(this,this.jJ);g.tU(this.player,this.jJ.element,4);a=new g.U({I:"button",
Ma:["ytp-miniplayer-close-button","ytp-button"],W:{"aria-label":"Close"},V:[g.rG()]});g.L(this,a);a.Ea(this.jJ.element);this.T(a.element,"click",this.Up);a=new g.U({I:"button",Ma:["ytp-miniplayer-replay-button","ytp-button"],W:{"aria-label":"Close"},V:[g.Bva()]});g.L(this,a);a.Ea(this.jJ.element);this.T(a.element,"click",this.I9);this.T(this.player,"presentingplayerstatechange",this.Wd);this.T(this.player,"appresize",this.Kb);this.T(this.player,"fullscreentoggled",this.Kb);this.Kb()};
g.k.show=function(){this.Af=new g.zu(this.Fw,null,this);this.Af.start();this.vg||(this.KO(),this.vg=!0);0!==this.player.getPlayerState()&&g.U.prototype.show.call(this);this.Tc.show();this.player.unloadModule("annotations_module")};
g.k.hide=function(){this.Af&&(this.Af.dispose(),this.Af=void 0);g.U.prototype.hide.call(this);this.player.xg()||(this.vg&&this.Tc.hide(),this.player.loadModule("annotations_module"))};
g.k.ya=function(){this.Af&&(this.Af.dispose(),this.Af=void 0);g.U.prototype.ya.call(this)};
g.k.Up=function(){this.player.stopVideo();this.player.Qa("onCloseMiniplayer")};
g.k.I9=function(){this.player.playVideo()};
g.k.zJ=function(a){if(a.target===this.Ck.element||a.target===this.zv.element)g.ML(this.player.Tb())?this.player.pauseVideo():this.player.playVideo()};
g.k.Ch=function(){g.Nu(this.player.getRootNode(),"ytp-player-minimized",this.player.xg())};
g.k.bf=function(){this.Tc.Kc();this.Lj.Kc()};
g.k.Fw=function(){this.bf();this.Af&&this.Af.start()};
g.k.Wd=function(a){g.SG(a.state,32)&&this.tooltip.hide()};
g.k.Kb=function(){g.xX(this.Tc,0,this.player.ob().getPlayerSize().width,!1);g.mX(this.Tc)};
g.k.YR=function(a){this.player.xg()&&(0===a?this.hide():this.show())};
g.k.xc=function(){return this.tooltip};
g.k.dg=function(){return!1};
g.k.Nf=function(){return!1};
g.k.jk=function(){return!1};
g.k.lB=function(){};
g.k.vp=function(){};
g.k.Us=function(){};
g.k.Bn=function(){return null};
g.k.NH=function(){return null};
g.k.bO=function(){return new g.Ce(0,0)};
g.k.Vk=function(){return new g.Vr(0,0,0,0)};
g.k.handleGlobalKeyDown=function(){return!1};
g.k.handleGlobalKeyUp=function(){return!1};
g.k.Ir=function(a,b,c,d,e){var f=0,h=d=0,l=g.is(a);if(b){c=g.Iu(b,"ytp-prev-button")||g.Iu(b,"ytp-next-button");var m=g.Iu(b,"ytp-play-button"),n=g.Iu(b,"ytp-miniplayer-expand-watch-page-button");c?f=h=12:m?(b=g.gs(b,this.element),h=b.x,f=b.y-12):n&&(h=g.Iu(b,"ytp-miniplayer-button-top-left"),f=g.gs(b,this.element),b=g.is(b),h?(h=8,f=f.y+40):(h=f.x-l.width+b.width,f=f.y-20))}else h=c-l.width/2,d=25+(e||0);b=this.player.ob().getPlayerSize().width;e=f+(e||0);l=g.re(h,0,b-l.width);e?(a.style.top=e+"px",
a.style.bottom=""):(a.style.top="",a.style.bottom=d+"px");a.style.left=l+"px"};
g.k.showControls=function(){};
g.k.lq=function(){};
g.k.Xj=function(){return!1};
g.k.pu=function(){};
g.k.Qr=function(){};
g.k.Hm=function(){};
g.k.Gm=function(){};
g.k.Bq=function(){};
g.k.xp=function(){};
g.k.ax=function(){};
g.k.OH=function(){return null};g.w(Epb,g.zV);g.k=Epb.prototype;g.k.onVideoDataChange=function(){if(this.player.getVideoData()){var a=this.player.getVideoAspectRatio(),b=16/9;a=a>b+.1||a<b-.1;g.Nu(this.player.getRootNode(),"ytp-rounded-miniplayer-not-regular-wide-video",a)}};
g.k.create=function(){g.zV.prototype.create.call(this);this.B.T(this.player,"videodatachange",this.onVideoDataChange);this.onVideoDataChange()};
g.k.El=function(){return!1};
g.k.load=function(){this.player.hideControls();this.j.show()};
g.k.unload=function(){this.player.showControls();this.j.hide()};g.yV("miniplayer",Epb);})(_yt_player);
