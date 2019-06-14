package com.buseni.clientpwa.config;

//@Configuration
//@EnableWebSecurity
//@EnableGlobalMethodSecurity(prePostEnabled=true)
public class SpringSecurityConfig   
//extends WebSecurityConfigurerAdapter
{




//	@Autowired
//
//	public  void configureGlobal(AuthenticationManagerBuilder auth) throws Exception { 
//		//auth.userDetailsService(userAccountService).passwordEncoder(passwordEncoder());
//		auth.inMemoryAuthentication().withUser("client@edd").password("$2a$10$B/MsOt5DP1rWE5NaTEICret.HHWpNNDhS2wrgMQGpe7bk9VeSu8JW").roles("CLIENT");
//	}


	//	@Override
	//    protected void configure(HttpSecurity httpSecurity) throws Exception {
	//		 httpSecurity
	//		 .authorizeRequests()
	//	 .antMatchers("/api/**").permitAll()
	////			.antMatchers(
	////					HttpMethod.GET,
	////					"/v2/api-docs","/swagger-ui.html", "/webjars/**", "favicon.ico"
	////				).permitAll()
	////			.anyRequest()
	////			.authenticated()
	//			.and()
	//			.csrf()
	//			.disable();
	//        httpSecurity.headers().frameOptions().disable();
	//       
	//    }

	//	@Override
	//	protected void configure(HttpSecurity http) throws Exception {
	//		 http.authorizeRequests()
	//		.antMatchers(
	//                HttpMethod.GET,
	//                 "favicon.ico","manifest.json"
	//        ).permitAll()
	//		 .anyRequest().authenticated()
	//		.and()
	//        	.logout().permitAll().and().csrf().disable(); 	
	//         
	//	}


	//@Override
//	public void configure(WebSecurity web) throws Exception {
//		web.ignoring()
//		.antMatchers("/resources/**")
//		.antMatchers("/static/**")
//		.antMatchers("/css/**")
//		.antMatchers("/images/**")
//		.antMatchers("/manifest.json");
//
//	}









//	@Bean
//	public PasswordEncoder passwordEncoder(){
//		PasswordEncoder encoder = new BCryptPasswordEncoder();
//		return encoder;
//	}


}