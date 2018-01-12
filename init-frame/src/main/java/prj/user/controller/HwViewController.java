package prj.user.controller;
import com.google.common.collect.Lists;
import kit.common.QueryParam;
import kit.common.BaseController;
import org.apache.log4j.Logger;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.Map;
import java.util.HashMap;
import java.util.LinkedHashMap;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import org.mybatis.pagination.dto.PageMyBatis;
import org.mybatis.pagination.dto.datatables.PagingCriteria;
import org.mybatis.pagination.dto.datatables.SearchField;
import org.mybatis.pagination.dto.datatables.SortDirection;
import org.mybatis.pagination.dto.datatables.SortField;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;
import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;
import kit.common.TypeConvert;
import kit.common.BaseController;
import static kit.common.JsonResult.*;

import prj.user.dao.*;
import prj.user.model.*;

@Controller
@RequestMapping(value = "/prj_user/hwview")
public class HwViewController extends BaseController
{
	private static final UUID UUID_GENERATOR = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB");
	private static final Logger logger = Logger.getLogger(HwViewController.class);
	@Autowired  
    private HwViewDao hwViewDao;  	
	
	@Autowired
	private HwRoleDao hwRoleDao;
	
	@ResponseBody 
    @RequestMapping(method=RequestMethod.POST)
    public Map<String, Object> insert(@Valid @RequestBody HwView hwView,Errors errors)
	{
		if(errors.hasErrors())
			return error(errors);	
		
		
		
		  
         hwView.setToken(getAutoValue(java.lang.String.class));
		
    	try{
    		hwViewDao.insert(hwView);
			return ok("操作成功",hwView);
    	}catch(DataAccessException ex){
			return error(ex);
    	}    	
    }
    @ResponseBody
    @RequestMapping(method=RequestMethod.PUT)
    public Map<String, Object> update(@Valid @RequestBody HwView hwView,Errors errors)
	{
		if(errors.hasErrors())
			return error(errors);	
		
		
    	try{
    		hwViewDao.update(hwView);
    		return ok("操作成功");
    	}
    	catch(DataAccessException ex){
			return error(ex);
    	}    
    }    
    
	@ResponseBody
	@RequestMapping(value="/delete",method=RequestMethod.POST)
    public Map<String, Object> deleteList(@RequestParam("ids") String ids) 
	{
    	String[] strArr=ids.split("\\,");
    	if(strArr.length==0){
    		return error(getMessage("msg.operation.noselect"));
    	}
    	try{
    	   for(String s : strArr){
    		   if (StringUtils.hasText(s)) {
				  Object[] params = HwView.keyString2Array(s);
				  hwViewDao.delete((String)params[0]);
    		   }
    	   }
			return ok(getMessage("msg.operation.success"));
    	}catch(DataAccessException ex){
    		return error(ex);
 	    }        	
    }
	
	@ResponseBody
	@RequestMapping(value="/{token}",method=RequestMethod.DELETE)
    public Map<String, Object> delete(@PathVariable("token") String token) 
	{
    	try{
		   if (StringUtils.hasText(token)) {
			  Object[] params = HwView.keyString2Array(token);
			  hwViewDao.delete((String)params[0]);
		   }
			return ok(getMessage("msg.operation.success"));
    	}catch(DataAccessException ex){
    		return error(ex);
 	    }        	
    }
    
    
	protected <T> T getAutoValue(Class<T> autoValueClass) {
		if(autoValueClass.equals(String.class))
			return (T)UUID_GENERATOR.randomUUID().toString();
		else if(autoValueClass.equals(java.sql.Timestamp.class))
			return (T)new java.sql.Timestamp(System.currentTimeMillis());
		return null;
	}
  	@ResponseBody
	@RequestMapping(value = "/{token}", method = RequestMethod.GET)
    public Map<String,Object> detail(@PathVariable("token") String token) {    	
   		HwView hwView = hwViewDao.getObjFully(token);
   		return ok(hwView);
    }
    
    @ResponseBody
    @RequestMapping(method=RequestMethod.GET)
    public  Map<String,Object> queryList() {   	
        List<Object> list=toList(hwViewDao.queryListFully());
        return ok(list);
    }
    @ResponseBody
    @RequestMapping(value="/list",method=RequestMethod.POST)
    public Map<String,Object> queryListByPageFully(@RequestBody QueryParam queryParam) 
    {
		int intPage = Integer.parseInt(queryParam.pageNum);
		int intPageSize = Integer.parseInt(queryParam.numPerPage);
		int start = (intPage - 1) * intPageSize;

		List<SortField> sortFields = Lists.newArrayList();
		if (StringUtils.hasText(queryParam.orderField))
			sortFields.add(new SortField(queryParam.orderField, queryParam.orderDirection));

		List<SearchField> searchFields = Lists.newArrayList();
		if (StringUtils.hasText(queryParam.name) && StringUtils.hasText(queryParam.keywords))
			searchFields.add(new SearchField(queryParam.name, false, false, queryParam.keywords));
		if (StringUtils.hasText(queryParam.module) && StringUtils.hasText(queryParam.keywords))
			searchFields.add(new SearchField(queryParam.module, false, false, queryParam.keywords));
		if (StringUtils.hasText(queryParam.json) && StringUtils.hasText(queryParam.keywords))
			searchFields.add(new SearchField(queryParam.json, false, false, queryParam.keywords));
		if (StringUtils.hasText(queryParam.nt) && StringUtils.hasText(queryParam.keywords))
			searchFields.add(new SearchField(queryParam.nt, false, false, queryParam.keywords));
		PagingCriteria baseCriteria = PagingCriteria.createCriteriaWithAllParamterAddi(start, intPageSize, intPage - 1, sortFields, searchFields, "", "or");
		try {
				PageMyBatis<HwView> pageMyBatis = hwViewDao.queryListByPageFully(baseCriteria);
				
				Map param = new LinkedHashMap();
				param.put("total",pageMyBatis.getTotal());
				return ok("",toList(pageMyBatis),param);
		}
		catch(Exception e)
		{
			logger.info(e.toString());
		}
		return null;			
    }
	
}
