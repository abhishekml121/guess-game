let start_game_btn = document.getElementById('start_game_btn');
        let submit_btn = document.getElementById('submit');
        let user_guess_input = document.getElementById('user_guess_input');
        let total_chance = 10;
        let computer_guess;
        let push_guesses_to_array = [];
        let guessed_info = document.getElementById('guessed_info');
        let para_info = document.getElementById('para_info');
        let wrong_info = document.getElementById('wrong');
        let win_info = document.getElementById('win_info');
        let wrong=[];
        let legend = document.querySelectorAll('legend');
        let remaining = document.getElementById('remaining');
        
        user_guess_input.disabled=true;
        submit_btn.disabled=true;
         submit_btn.style.cursor='auto';
        
        function game_started(e){
             guessed_info.textContent='';
             win_info.textContent='';
            start_game_btn.disabled=true;
            start_game_btn.style.cursor='auto';
             submit_btn.style.cursor='pointer';
            start_game_btn.style.color='#484848';
            user_guess_input.disabled=false;
            submit_btn.disabled=false;
            user_guess_input.placeholder='try to guess';
            para_info.textContent='';
            user_guess_input.focus();
            computer_guess = Math.floor(Math.random() * 50) + 1; 
            remaining.textContent=total_chance;
        }
        
        
        
        function remove_animation(){
            legend.forEach(function(element){
                element.removeAttribute('style');
            });
        }
        function reset(){
            start_game_btn.disabled=false;
                user_guess_input.disabled=true;
                submit_btn.disabled=true;
            wrong_info.textContent='';
           
            start_game_btn.style.cursor='pointer';
            submit_btn.style.cursor='auto';
                push_guesses_to_array = [];
            wrong = [];
            remaining.textContent='';
                start_game_btn.style.color='black';
            total_chance = 10;
        }
        
        function user_guess_func(e){
            /*runs only if player has chance*/
            if(total_chance >1){
                remove_animation();
                para_info.style.fontSize="20px";
                start_game_btn.style.cursor='auto';
                para_info.style.backgroundColor='';
            let guessed = user_guess_input.value;
                /*runs only if player insert number only*/
                if(!isNaN(user_guess_input.value) && (user_guess_input.value.indexOf(' ') == -1) && (user_guess_input.value.length !=0)){
                    push_guesses_to_array.push(guessed);
                   guessed_info.innerHTML = '<pre>' + push_guesses_to_array.join("  ") + '</pre>'; 
                    user_guess_input.value='';
                     user_guess_input.focus();
                    if(guessed < computer_guess){
                para_info.textContent='You guessed low !';
            }
            else{
                para_info.textContent='You guessed high !';
            }
                    if(guessed == computer_guess){
                user_guess_input.value='';
                win_info.textContent='You won !';
               win_info.style.backgroundColor='#4aa34a';
                        win_info.style.fontSize="50px";
                        reset();
                
            }
                     total_chance--;
                    remaining.textContent=total_chance;
                }
                else{
                    /*console.log(wrong.length);*/
                    if(wrong.length <=2){
                        
                    wrong.push(guessed);
                    wrong_info.innerHTML= '<pre>'+wrong.join("  ");+'</pre>';
                    user_guess_input.value='';
                    user_guess_input.focus();
                    para_info.innerHTML='<big>Wrong</big> input !';
                        legend[1].setAttribute("style", "animation-name: animi;");
                    }
                    else{
                        
                        reset();
                    }
                }
            
            } // if(total_chance >1) --END--
            else{
                para_info.innerHTML="You have no chance left ! <br>" + 'My number was : ' + computer_guess;
              
                reset();
            }
        }
           
        start_game_btn.addEventListener('click', game_started);
        submit_btn.addEventListener('click', user_guess_func);
