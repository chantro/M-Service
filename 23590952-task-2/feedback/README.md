# Feedback
1. 중복 호출
    
    ```jsx
    const ffns = data();
    const fd1 = nameListQuery1(ffns, query);
    const fd2 = nameListQuery1(ffns, query);
    const fd3 = nameListQuery1(ffns, query);
    
    const fdns = fd1;
    ```
    
    [문제점]
    
    - 위와 같이 fd1 만 사용하고 있는데, 나머지 변수들이 불필요하다고 생각합니다.
    - data() 함수가 현재 고정된 값이며, 타이핑할 때마다 해당 함수를 호출하는 것에 있어서 비효율적인 것 같습니다.
    
    [개선점]
    
    - fd1 하나만 사용합니다.
    - data의 이름값이 추가되거나 제거될 경우를 생각한다면, 바로 반영되는것이 맞겠지만 위의 방식은 타이핑할 때마다 확인하는 방식으로 적절하지 않다고 생각합니다. 이를 위해서 만약 데이터베이스와 연동할 경우, cdc와 서버를 통해 이름값이 업데이트될 시, 클라이언트가 반영하도록 하는 것이 좋을 것 같습니다. 만약 csv 파일을 클라이언트에 둔다면, 주기적으로 변화를 확인하는 것이 좋을 것 같습니다.

2. DOM 전체를 매번 삭제하고 재삽입하고 있습니다.
    
    ```jsx
    const cc1 = document.querySelector('.container');
    bb.removeChild(cc1);
    bb.offsetHeight;
    
    const cc2 = document.createElement('div');
    cc2.className = 'container';
    cc2.innerHTML = `
    <h1>이름 검색 시스템</h1>
    
    <div class="info">
    💡 이름을 입력하면 자동완성과 관련 결과를 확인할 수 있습니다.
    </div>
    ...
    `
    bb.appendChild(cc2)
    ```
    
    [문제점]
    
    - container 전체를 삭제하고 새로 DOM을 만들어 삽입하고 있습니다.
    - hQuery()의 내부에서 매 입력 이벤트마다 해당 DOM을 계속 재삽입합니다.
    - 이는 성능 저하를 불러일으킬 수 있다고 생각합니다.
    
    [개선점]
    
    - .container는 한 번만 생성하고 유지합니다.
    - 검색창 값이 변화할 때에는 필요한 부분만 업데이트 하도록 합니다.
        - resultsList
        - autocompleteOverlay

3. 타이핑이 끊기는 문제가 있습니다.
    
    ```jsx
    if (sii) {
    	const nsi = sii.cloneNode(true);
    	sii.parentNode.replaceChild(nsi, sii);
    
    	nsi.addEventListener('input', (e) => {
    		hQuery(e.target.value);
    	});
    	
    	nsi.addEventListener('focus', () => {
    	const aes = document.querySelectorAll('*');
    	aes.forEach(element => {
    	element.style.display = element.style.display || '';
    		 element.offsetHeight;
    	});
    ```
    
    [문제점]
    
    - input에 사용자가 입력 중일 때 위와 같이 노드를 교체하면 포커스가 사라져 끊기게 됩니다.
    - 단순히 이벤트 리스너만 추가하려고 클론하기에는 무거워보입니다.
    
    [개선점]
    
    - cloneNode 없이 input 요소에 직접 이벤트 리스너를 등록하도록 합니다.

4. I()와 hQuery() 함수에서 중복된 부분이 있습니다.
    
    → 랜더링 하는 부분을 따로 분리해 가독성을 높입니다.
    

5. .offsetHeight 가 자주 쓰입니다.
    
    → 변경이 있을 때, 브라우저가 즉시 반영하도록 넣은 코드이지만 해당 코드에서는 DOM에 관련한 변경부분만 있기 때문에 불필요하다고 생각합니다.
    
6. 기존 검색 결과를 지우기 위한 코드가 복잡도가 높은 것 같습니다.
    
    ```jsx
    while (rll.firstChild) {
                        rll.removeChild(rll.firstChild);
                        rll.offsetHeight;
                    }
    ```
    
    → 하나씩 지우기 보다는 innerHTML=’’ 로 모두 제거하는 것이 좋을 것 같습니다.
    

7. DOM 렌더링이 끝난 뒤, 딜레이를 주어 스타일 속성을 반복적으로 설정하는 부분이 비효율적이라고 생각합니다.
    
    ```jsx
    setTimeout(() => {
                    const aes3 = document.querySelectorAll('*');
                    aes3.forEach(element => {
                        element.style.display = element.style.display || '';
                        element.offsetHeight;
                    });
    
                    const cr2 = document.querySelector('.container');
                    if (cr2) {
                        cr2.style.transform = 'scale(1)';
                        cr2.style.opacity = '1';
                        cr2.offsetHeight;
                    }
    
                    const si3 = document.getElementById('searchInput');
                    if (si3) {
                        si3.style.width = '100%';
                        si3.style.padding = '15px';
                        si3.offsetHeight;
                    }
                }, 1);
    ```
    
    → setTimeout 보다는 requestAnimationFrame이 더 정확한 방법일 것 같습니다.
