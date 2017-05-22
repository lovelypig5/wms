select * from goodsub gs 
left join r_goodsub_attr rga on rga.goodsub_id = gs.id
left join attr a on a.id = rga.attr_id
where count = 9681 and good_id = 5;

select group_concat(rra.id) from r_record_attr rra where rra.record_id in (select r.id from v_record_attr vra left join record r on vra.record_id = r.id left join good g on g.id = r.good_id where attr_id = '7,13,21' or attr_id = '7,22,13' or attr_id = '13,7,22' or attr_id = '13,22,7' or attr_id = '22,7,13' or attr_id = '22,13,7'  and r.good_id = 5
) and attr_id = 22;

select count(rra.id) from r_record_attr rra where rra.record_id in (select r.id from v_record_attr vra left join record r on vra.record_id = r.id left join good g on g.id = r.good_id where attr_id = '7,13,21' or attr_id = '7,22,13' or attr_id = '13,7,22' or attr_id = '13,22,7' or attr_id = '22,7,13' or attr_id = '22,13,7'  and r.good_id = 5
) and attr_id = 22;

delete from r_goodsub_attr where id = 259;

delete from r_record_attr where id in (2050,2054,2056,2080,2084,2095,2109,2116,2140,2158,2160,2165,2167,2175,2180,2183,2184,2194,2201,2202,2211,2217,2219,2221,2222);