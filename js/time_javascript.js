const tick = new Audio("./se/tick.wav");
const tack = new Audio("./se/tack.wav");
tick.loop = false;
tick.volume = 0.3;
tack.loop = false;
tack.volume = 0.3;
window.onload = function() {
    init();
};
function init(){
    clock();
    setInterval('clock();',200);
}
function clock(){
    // 文字ベースのデジタル時計
    var now = new Date();
    var yobi = new Array("日","月","火","水","木","金","土");
    var y = now.getYear() + 1900;
    var g = ("0"+(now.getMonth()+1)).slice(-2);
    var d = ("0"+now.getDate()).slice(-2);
    var t = ("0"+now.getHours()).slice(-2);
    var m = ("0"+now.getMinutes()).slice(-2);
    var s = ("0"+now.getSeconds()).slice(-2);
    var yo = now.getDay();
    var now_Date = y+"/"+g+"/"+d;
    var now_Time = t+":"+m+":"+s;
    var now_Yobi = "("+yobi[yo]+") ";
    var now_Text = now_Time + "<BR>" + now_Date + now_Yobi;
    document.getElementById('now_text').innerHTML = now_Text;
}
(()=>{
    // 円の作成
    const addDiv = (parentDiv,className,callBack = null ) => {
        const t = document.createElement("div");
        t.classList.add(className);
        if( callBack && typeof callBack === "function") callBack(t);
        parentDiv.appendChild(t);
        return t;
    }
    
    // 円の作成
    const createFace = () =>{
        const analog = document.getElementById("analog");
        const vp = [analog.clientWidth,analog.clientHeight];
        const chokei = Math.min(...vp);
 
        const analogFace = addDiv(analog,"analog-face",( t )=>{
            [t.style.height,t.style.width] = [chokei+"px",chokei+"px"];
            [t.style.top,t.style.left] = [(vp[1]-chokei) / 2 + "px",(vp[0]-chokei) / 2 + "px"];
        });
        
        // 60個のメモリの作成 
        const r60 = 360 / 60;
        const originX = analogFace.clientWidth/2;
 
        for( let i = 0 ; i < 60 ; i ++){
            const deg = i * r60;
 
            addDiv( analogFace ,i % 5 ===0 ? "analog-line1" : "analog-line2",
                ( t )=>{
 
                    if( i > 0 ){
                        t.style.transformOrigin = `${originX}px center`;
                        t.style.transform=`rotate(${deg}deg)`;
                    }
            });
        }
        
        // 文字盤の時刻を表示
        const r12 = 360 / 12;
        const hankei = originX;
        const moziPos = hankei -30 ;
        const MathPi = Math.PI / 180;
 
        for( let i = 0 ; i < 12 ; i ++){
            const deg = i * r12;
            addDiv( analogFace ,"analog-text",
                ( t ) =>{
                    const mojiX = hankei + moziPos * Math.sin( deg * MathPi );
                    const mojiY = hankei - moziPos * Math.cos( deg * MathPi );
                    [t.style.top,t.style.left] = [mojiY + "px",mojiX + "px"];
                    if(i == 0){ t.innerText = "Ⅻ";}
                    if(i == 1){ t.innerText = "Ⅰ";}
                    if(i == 2){ t.innerText = "Ⅱ";}
                    if(i == 3){ t.innerText = "Ⅲ";}
                    if(i == 4){ t.innerText = "Ⅳ";}
                    if(i == 5){ t.innerText = "Ⅴ";}
                    if(i == 6){ t.innerText = "Ⅵ";}
                    if(i == 7){ t.innerText = "Ⅶ";}
                    if(i == 8){ t.innerText = "Ⅷ";}
                    if(i == 9){ t.innerText = "Ⅸ";}
                    if(i == 10){ t.innerText = "Ⅹ";}
                    if(i == 11){ t.innerText = "Ⅺ";}
                    /*t.innerText = i === 0 ? "Ⅻ" : i.toString();
                    t.innerText = i === 1 ? "Ⅰ" : i.toString();
                    t.innerText = i === 2 ? "Ⅱ" : i.toString();
                    t.innerText = i === 3 ? "Ⅲ" : i.toString();
                    t.innerText = i === 4 ? "Ⅳ" : i.toString();
                    t.innerText = i === 5 ? "Ⅴ" : i.toString();
                    t.innerText = i === 6 ? "Ⅵ" : i.toString();
                    t.innerText = i === 7 ? "Ⅶ" : i.toString();
                    t.innerText = i === 8 ? "Ⅷ" : i.toString();
                    t.innerText = i === 9 ? "Ⅸ" : i.toString();
                    t.innerText = i === 10 ? "Ⅹ" : i.toString();
                    t.innerText = i === 11 ? "Ⅺ" : i.toString();*/

                });
        }
        
        // 中心点
        addDiv( analogFace , "analog-center" );
 
        return analogFace;
    };

    // 初回のみのアニメーション設定
    const firstTransition = "transform 0.5s ease-out";
 
    const handObj = function( className,{parentDiv:parentDiv
            ,LengthPer:LengthPer,handGapPer:handGapPer,divNum:divNum}){
        // 針の作成
        const hankei = parentDiv.clientHeight / 2;
        const handLength = hankei * LengthPer / 100; // 針の長さ
        const handGap = hankei * handGapPer / 100; // 針の飛び出している長さ
 
        const elm = addDiv( parentDiv , className);
 
        elm.style.height = (handLength + handGap) + "px";
        [elm.style.top,elm.style.left] =
            [ (hankei - handLength ) + "px", (hankei - elm.clientWidth/2) + "px"];
        elm.style.transformOrigin = `center ${handLength}px `;
        elm.style.transition=firstTransition;
 
        this.rotateText = []; // rotate値をあらかじめ作成
        const angle = 360 / divNum;
 
        for( let i = 0 ; i < divNum ; i++){
            this.rotateText.push( `rotate(${ angle * i }deg)` );
        }
        this.elm = elm;
        this.currentValue = null;
 
        this.transitionFlg = true;
        this.transitionCount = 0;
    };
    // 針の移動処理
    handObj.prototype.moveHand=function( val ){
        if( this.currentValue === val ) return;
        if( this.transitionFlg && ++this.transitionCount > 1 ) {
            // アニメーション効果削除
            this.elm.style.transition=""; this.transitionFlg=false;
        }
        this.currentValue = val;
        if( this.elm.className === "analog-seconds" && this.currentValue % 2 === 1) tick.play();
        if( this.elm.className === "analog-seconds" && this.currentValue % 2 === 0) tack.play();
        
        this.elm.style.transform = this.rotateText[val];
        
    };
    
    // 初回のみアニメーション
    window.addEventListener("DOMContentLoaded", () => {

        const analogFace  = createFace();
        // 秒針
        const secondHand = new handObj("analog-seconds",{
            parentDiv:analogFace, // 親要素
            LengthPer:85,         // 針の長さ(パーセント)
            handGapPer:20,        // 飛び出す長さ（パーセント）
            divNum:60             // 一周の分割数
        });
        // 時針
        const hourHand = new handObj("analog-hours",{
            parentDiv:analogFace,
            LengthPer:55,
            handGapPer:10,
            divNum:12 * 60
        });
        // 分針
        const minuteHand = new handObj("analog-minutes",{
            parentDiv:analogFace,
            LengthPer:80,
            handGapPer:10,
            divNum:60
        });
 
        setInterval(()=> {
            const date = new Date();
            secondHand.moveHand(date.getSeconds());
            hourHand.moveHand((date.getHours()%12) * 60 + date.getMinutes());
            minuteHand.moveHand(date.getMinutes());
        },1000);
    });
})();