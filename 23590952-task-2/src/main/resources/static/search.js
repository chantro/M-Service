let names = [];

        function data() {
            const csvData = `Alexander,Alice,Amanda,Andrew,Angela,Anna,Anthony,Ashley,Barbara,Benjamin,Betty,Brian,Carol,Charles,Christopher,Daniel,David,Deborah,Donald,Donna,Dorothy,Edward,Elizabeth,Emily,Emma,Eric,Frances,Frank,Gary,George,Helen,Henry,James,Jason,Jennifer,Jessica,John,Joseph,Joshua,Karen,Kimberly,Larry,Laura,Linda,Lisa,Margaret,Maria,Mark,Mary,Matthew,Michael,Michelle,Nancy,Nicole,Noah,Olivia,Patricia,Paul,Rachel,Rebecca,Richard,Robert,Ronald,Ruth,Sandra,Sarah,Scott,Sharon,Sophia,Stephen,Steven,Susan,Thomas,Timothy,Victoria,Virginia,Walter,Wayne,William,Abigail,Adam,Adrian,Albert,Andrea,Annie,Arthur,Austin,Brenda,Bruce,Carl,Catherine,Christine,Cynthia, Diane,Douglas,Eugene,Hannah,Harold,Isabella,Jack,Jacob,Jane,Janet,Jerry,Joan,Jonathan,Juan,Julie,Justin,Katherine,Keith,Kevin,Laura,Louis,Martha,Mason,Nathan,Noah,Peter,Ralph,Raymond,Roger,Ryan,Samantha,Sean,Shirley,Tyler,Virginia,Willie`;

            return csvData.split(',').map(name => name.trim());
        }

        function nameListQuery1(nameList, query) {
            if (!query.trim()) {
                return [];
            }

            return nameList.filter(name =>
                name.toLowerCase().includes(query.toLowerCase())
            );
        }

        function nameListQuery2(nameList, query) {
            if (!query.trim()) {
                return null;
            }

            const match = nameList.find(name =>
                name.toLowerCase().startsWith(query.toLowerCase())
            );

            return match || null;
        }

        //초기 로드될 때 실행 함수
        function setup(){
            // 이벤트 등록
            const si = document.getElementById('searchInput');
            si.addEventListener('input', (e) => {
                hQuery(e.target.value);
            });

            si.addEventListener('focus', () => {
                si.style.width = '100%';
                si.style.padding = '15px';
            });

            renderResults(query = '');

            // setTimeOut 대체
            const c = document.querySelector('.container');
            requestAnimationFrame(() => {
                c.classList.add('show');
            });

        }

        //동적 랜더링 함수
        function renderResults(query = ''){
            const rll = document.getElementById('resultsList');
            const acco = document.getElementById('autocompleteOverlay');

            const fdns = nameListQuery1(names, query);
            rll.innerHTML = '';  //이전 결과 모두 지우기

            if (fdns.length === 0) {
                    const no1 = document.createElement('li');
                    no1.className = 'no-results';
                    no1.textContent = query.trim() ? '검색 결과가 없습니다' : '검색어를 입력해주세요';
                    rll.appendChild(no1);
                    //rll.offsetHeight;
            } else {
                    fdns.forEach((name, index) => {
                        const li1 = document.createElement('li');
                        li1.textContent = name;
                        li1.style.padding = '8px 12px';
                        li1.style.margin = '5px 0';
                        //li1.offsetHeight;
                        rll.appendChild(li1);

                });
            }

            //autocomplete Overlay 렌더링
            acco.innerHTML = '';
            const acc = nameListQuery2(names, query);
            if (acc && query.length > 0) {
                    const vs1 = document.createElement('span');
                    vs1.style.color = 'transparent';
                    vs1.textContent = query;
                    acco.appendChild(vs1);
                    //acco.offsetHeight;

                    const hs1 = document.createElement('span');
                    hs1.className = 'autocomplete-hint';
                    hs1.textContent = acc.slice(query.length);
                    acco.appendChild(hs1);
                    //acco.offsetHeight;
            }
        }

        function hQuery(query) {
            renderResults(query);
        }

        function i() {
            names = data();
            setup();

            console.log('애플리케이션이 초기화되었습니다.');
            console.log(`총 ${names.length}개의 이름이 로드되었습니다.`);
        }

        document.addEventListener('DOMContentLoaded', i);