﻿module BABYLON {
    export class CubeTexture extends BaseTexture {
        public url: string;
        public coordinatesMode = Texture.CUBIC_MODE;

        private _noMipmap: boolean;
        private _files: string[];
        private _extensions: string[];
        private _textureMatrix: Matrix;

        public static CreateFromImages(files: string[], scene: Scene, noMipmap?: boolean) {
            return new CubeTexture("", scene, null, noMipmap, files);
        }

        constructor(rootUrl: string, scene: Scene, extensions?: string[], noMipmap?: boolean, files?: string[]) {
            super(scene);

            this.name = rootUrl;
            this.url = rootUrl;
            this._noMipmap = noMipmap;
            this.hasAlpha = false;

            if (!rootUrl && !files) {
                return;
            }

            this._texture = this._getFromCache(rootUrl, noMipmap);

            if (!files) {

                if (!extensions) {
                    extensions = ["_px.jpg", "_py.jpg", "_pz.jpg", "_nx.jpg", "_ny.jpg", "_nz.jpg"];
                }

                files = [];

                for (var index = 0; index < extensions.length; index++) {
                    files.push(rootUrl + extensions[index]);
                }

                this._extensions = extensions;
            }

            this._files = files;

            if (!this._texture) {
                if (!scene.useDelayedTextureLoading) {
                    this._texture = scene.getEngine().createCubeTexture(rootUrl, scene, files, noMipmap);
                } else {
                    this.delayLoadState = Engine.DELAYLOADSTATE_NOTLOADED;
                }
            }

            this.isCube = true;

            this._textureMatrix = Matrix.Identity();
        }

        public clone(): CubeTexture {
            var newTexture = new CubeTexture(this.url, this.getScene(), this._extensions, this._noMipmap, this._files);

            // Base texture
            newTexture.level = this.level;
            newTexture.wrapU = this.wrapU;
            newTexture.wrapV = this.wrapV;
            newTexture.coordinatesIndex = this.coordinatesIndex;
            newTexture.coordinatesMode = this.coordinatesMode;

            return newTexture;
        }

        // Methods
        public delayLoad(): void {
            if (this.delayLoadState !== Engine.DELAYLOADSTATE_NOTLOADED) {
                return;
            }

            this.delayLoadState = Engine.DELAYLOADSTATE_LOADED;
            this._texture = this._getFromCache(this.url, this._noMipmap);

            if (!this._texture) {
                this._texture = this.getScene().getEngine().createCubeTexture(this.url, this.getScene(), this._extensions);
            }
        }

        public getReflectionTextureMatrix(): Matrix {
            return this._textureMatrix;
        }
        
        public static Parse(parsedTexture: any, scene: Scene, rootUrl: string): CubeTexture {
            var texture = null;
            if ((parsedTexture.name || parsedTexture.extensions) && !parsedTexture.isRenderTarget) {
                texture = new BABYLON.CubeTexture(rootUrl + parsedTexture.name, scene, parsedTexture.extensions);
                texture.name = parsedTexture.name;
                texture.hasAlpha = parsedTexture.hasAlpha;
                texture.level = parsedTexture.level;
                texture.coordinatesMode = parsedTexture.coordinatesMode;
            }
            return texture;
        }

        public serialize(): any {
            if (!this.name) {
                return null;
            }

            var serializationObject: any = {};
            serializationObject.name = this.name;
            serializationObject.hasAlpha = this.hasAlpha;
            serializationObject.isCube = true;
            serializationObject.level = this.level;
            serializationObject.coordinatesMode = this.coordinatesMode;

            return serializationObject;
        }
    }
} 