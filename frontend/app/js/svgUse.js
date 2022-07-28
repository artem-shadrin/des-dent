
export default class SvgUse {
    constructor() {
        this.init();
    }
    init() {
        const self = this;
        ( function( window, document )
        {
            let file = (window.App.debug) ? './icons.svg' : '/frontend/assets/icons.svg'

            const revision = false

            if( !document.createElementNS || !document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' ).createSVGRect ) {
                return true;
            }

            var isLocalStorage = 'localStorage' in window && window[ 'localStorage' ] !== null,
                request,
                data,
                insertIT = function()
                {
                    var g = document.createElement('div');
                    g.id = 'svg-sprite';
                    g.className = 'hidden';
                    document.body.appendChild(g);
                    document.getElementById('svg-sprite').insertAdjacentHTML( 'afterbegin', data );
                    window.svg4everybody({
                        polyfill: true // polyfill <use> elements for External Content
                    });
                },
                insert = function()
                {
                    if( document.body ) {
                        insertIT();
                    }
                    else {
                        document.addEventListener( 'DOMContentLoaded', insertIT );
                    }
                };

            try
            {
                request = new XMLHttpRequest();
                request.open( 'GET', file, true );
                request.onload = function()
                {
                    if( request.status >= 200 && request.status < 400 )
                    {
                        data = request.responseText;
                        insert();
                        if( isLocalStorage )
                        {
                            localStorage.setItem('inlineSVGdata', data);
                        }
                    }
                };
                request.send();
            }
            catch( e ) {
                console.error(e);
            }

        }( window, document ) );
    }
}
