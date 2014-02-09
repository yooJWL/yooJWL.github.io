//
//
function AnimatedSprite(spriteImage, frameW, frameH, frames) {
    this.imageWidth = spriteImage.width;
    this.numFrames = frames;
    this.frameIndex = 0;
    this.frameWidth = frameW;
    this.frameHeight = frameH;
    this.framePosX = 0;
    this.framePosY = 0;
    this.rotation = 0;
    this.rotRate = 0;
    this.canvasPosX = 0;
    this.canvasPosY = 0;
    this.alive = true;
    this.currentTime = 0;
    this.maxTime = 100;

    this.setPosition = function ( pos ) {
        this.canvasPosX = pos.x;
        this.canvasPosY = pos.y;
    };

    this.setFrameSequence = function()
    {
        this.framePosX += this.frameWidth;
        this.frameIndex += 1;
        if (this.frameIndex >= this.numFrames) {
            this.framePosX = 0;
            this.framePosY = 0;
            this.frameIndex = 0;
        } else if ((this.framePosX + this.frameWidth) > this.imageWidth) {
            this.framePosX = 0;
            this.framePosY += this.frameHeight;
        }
    };

    this.nextFrame = function () {
        if (this.currentTime > this.maxTime) {
            this.rotation += this.rotRate;
            this.setFrameSequence();
            this.currentTime = 0;
        }
    };

    this.draw = function (ctx) {
        if (this.alive === true) {
            this.nextFrame();
            ctx.save();
            //ctx.translate( this.canvasPosX, this.canvasPosY );
            //ctx.rotate(this.rotation);
            ctx.drawImage(spriteImage, this.framePosX, this.framePosY, this.frameWidth, this.frameHeight, this.canvasPosX, this.canvasPosY, this.frameWidth, this.frameHeight);
            ctx.restore();
        }
        this.currentTime++;
    }
}