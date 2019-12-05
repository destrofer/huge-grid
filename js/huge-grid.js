/*
* HugeGrid - jQuery Plugin
*
* Copyright (c) 2012 Viacheslav Soroka
*
* Version: 1.11.0
*
* MIT License - http://www.opensource.org/licenses/mit-license.php
*/

/**
 * @var {function} initSpecialInputs
 **/

/**
 * @var {function(async: boolean)} createFilter
 */

;(function($){
	/**
	 * @typedef {string} HugeGridColumnId
	 */

	/**
	 * @typedef {{
	 * 		id: HugeGridColumnId,
	 * 		content?: string,
	 *		children?: Array.<HugeGridColumn>,
	 * 		width?: number,
	 * 		noSort?: boolean,
	 * 		hidden?: boolean,
	 * 		class?: string
	 * }} HugeGridColumn
	 */

	/**
	 * @typedef {{
	 * 		id: string|number,
	 *  	marked?: boolean,
	 *  	rowClass?: string,
	 * 		content: Object.<HugeGridColumnId, string|number>,
	 * 		titles?: Object.<HugeGridColumnId, string|number>,
	 * 		classes?: Object.<HugeGridColumnId, string>,
	 * 		tooltips?: Object.<HugeGridColumnId, string|number>,
	 * 		sortData?: Object.<HugeGridColumnId, string|number>,
	 * 		attributes?: Object.<HugeGridColumnId, Object.<string, string|object>>,
	 * 		rowAttributes?: Object.<string, string|object>,
	 * 		data?: Object.<HugeGridColumnId, *>,
	 * 		ranges?: Array.<HugeGridRange>,
	 * 		transformed?: boolean
	 * }} HugeGridRow
	 */

	/**
	 * @typedef {{
	 * 		id: string,
	 * 		type: string,
	 * 		from: HugeGridColumnId,
	 * 		to: HugeGridColumnId,
	 * 		content: string,
	 * 		class: string,
	 * 		style: string,
	 * 		tooltip: string
	 * }} HugeGridRange
	 */

	/**
	 * @typedef {{
	 * 		gridId: string,
	 * 		dataSession: number,
	 * 		firstRow: number,
	 * 		rowCount: number,
	 * 		sortKey: string,
	 * 		sortDesc: number,
	 * 		param: string,
	 * 		filter: string
	 * }} HugeGridAjaxRequest
	 */

	/**
	 * @typedef {{
	 * 		success: boolean,
	 * 		totalRows: number,
	 * 		totalUnfilteredRows: number,
	 * 		firstRow: number,
	 * 		lastRow: number,
	 * 		dataSession: string,
	 * 		data: Array<HugeGridRow>
	 * }} HugeGridAjaxResponse
	 */
	 
	/**
	 * @typedef {{
	 * 		rowClass: string
	 * }} HugeGridFooter
	 */

	/**
	 * @typedef {Array.<HugeGridColumn>} HugeGridHeader
	 */

	/**
	 * @typedef {{
	 * 		move: function
	 * }} HugeGridTracker
	 */

	/**
	 * @typedef {{
	 * 		url: string,
	 * 		params?: object
	 * }} HugeGridSortTrackingOptions
	 */

	/**
	 * @typedef {{
	 * 		value: number|string,
	 * 		text: string,
	 * 	    disabled?: boolean
	 * }} HugeGridFilterSelectOption
	 */

	/**
	 * @typedef {{
	 * 		separator: "horizontal"|"vertical"
	 * }} HugeGridFilterSelectSeparator
	 */

	/**
	 * @typedef {{
	 * 		from: string,
	 * 		to: string
	 * }} HugeGridFilterRange
	 */

	/**
	 * @typedef {{
	 * 		text: string,
	 * 		action: "select"|"deselect"|"toggle",
	 * 		value: Array.<string>
	 * }} CustomSelectAction
	 */

	/**
	 * @typedef {{
	 * 		text?: string,
	 * 		actions: Array.<CustomSelectAction>
	 * }} CustomSelectActionGroup
	 */

	/**
	 * @typedef {{
	 *		id: HugeGridColumnId,
	 *		postName?: string,
	 *		type: "text"|"number"|"date"|"time"|"select",
	 *		options?: Array.<HugeGridFilterSelectOption|HugeGridFilterSelectSeparator>,
	 *	    actions?: Array.<CustomSelectActionGroup>,
	 *		value?: string|Array.<number|string>|HugeGridFilterRange
	 * }} HugeGridFilter
	 */

	/**
	 * @typedef {{
	 * 		type: "filter"|"header"|"data"|"footer"|"range",
	 * 		colId?: HugeGridColumnId,
	 * 		rowIdx?: number,
	 * 		rowId?: string,
	 * 		rangeId?: string,
	 * 		row?: HugeGridRow,
	 * 		range?: HugeGridRange,
	 * 		viewTarget?: *
	 * }} HugeGridTarget
	 */

	/**
	 * @typedef {{
	 * 		row: number,
	 * 		column: HugeGridColumn
	 * }} HugeGridSelectionPoint
	 */

	/**
	 * @typedef {{
	 * 		active: boolean,
	 * 		startedAt: HugeGridSelectionPoint,
	 * 		from: HugeGridSelectionPoint,
	 * 		to: HugeGridSelectionPoint
	 * }} HugeGridSelection
	 */

	/**
	 * @typedef {{
	 * 		header: Array.<HugeGridColumn>,
	 * 		data: Array.<HugeGridRow>|string,
	 * 		footer?: HugeGridRow|null,
	 * 		filter?: HugeGridFilter|null,
	 * 		id?: string,
	 * 		splitterWidth?: number,
	 * 		fixedColumns?: number,
	 * 		headRowHeight?: number,
	 * 		filterRowHeight?: number,
	 * 		markedColumnBackground?: string,
	 * 		sortKey?: string,
	 * 		sortDesc?: boolean,
	 * 		noSort?: boolean,
	 * 		autoSort?: boolean,
	 * 		sortRowHeight?: number,
	 * 		sortMarkup?: string,
	 * 		noSortMarkup?: string,
	 * 		dataType?: string,
	 * 		dataParam?: null|string,
	 * 		rowHeight?: number,
	 * 		rowCount?: number,
	 * 		blockSize?: number,
	 * 		hBlockSize?: number,
	 * 		superblockSize?: number,
	 * 		blockLevels?: number,
	 * 		maxConcurrentLoads?: number,
	 * 		preloadRows?: number,
	 * 		loadingBlockHeadMarkup?: string,
	 * 		loadingBlockContMarkup?: string,
	 * 		rangeBorderWidth?: number,
	 * 		selectionMode?: string,
	 * 		selectionMinColumnId?: null|HugeGridColumnId,
	 * 		selectionMaxColumnId?: null|HugeGridColumnId,
	 * 		footerHeight?: number,
	 * 		hScrollPos?: number,
	 * 		vScrollPos?: number,
	 * 		hScrollHeight?: number,
	 * 		vScrollWidth?: number,
	 * 		hScrollSpeed?: number,
	 * 		vScrollSpeed?: number,
	 * 		hScrollMarkup?: string,
	 * 		vScrollMarkup?: string,
	 *      touchScrollSensitivity?: number,
	 *      touchContextMenuTime?: number,
	 *      dblTapTime?: number,
	 * 		trackSorting?: HugeGridSortTrackingOptions,
	 * 		rowTransformer?: (function(rowData: HugeGridRow)),
	 * 		onSort?: (function(colId: HugeGridColumnId, isDesc: boolean): boolean),
	 * 		onMarkChange?: (function(target: HugeGridTarget)),
	 * 		onFilterChange?: (function(target: HugeGridTarget): boolean),
	 * 		onBeforeWheelScroll?: (function(event: JQueryEventObject|JQuery.Event, delta: number, deltaX: number, deltaY: number): boolean),
	 * 		onMouseDown?: (function(target: HugeGridTarget)),
	 * 		onMouseUp?: (function(target: HugeGridTarget)),
	 * 		onSelectionStart?: (function(target: HugeGridTarget)),
	 * 		onSelectionChange?: (function(target: HugeGridTarget)),
	 * 		onSelectionEnd?: (function(target: HugeGridTarget)),
	 * 		onClick?: (function(target: HugeGridTarget)),
	 * 		onDblClick?: (function(target: HugeGridTarget)),
	 * 		onTouchStart?: (function(event: JQueryEventObject|JQuery.Event, target: HugeGridTarget)),
	 * 		onTouchMove?: (function(event: JQueryEventObject|JQuery.Event, target: HugeGridTarget)),
	 * 		onTouchEnd?: (function(event: JQueryEventObject|JQuery.Event, target: HugeGridTarget)),
	 * 		onTap?: (function(event: JQueryEventObject|JQuery.Event, target: HugeGridTarget)),
	 * 		onDblTap?: (function(event: JQueryEventObject|JQuery.Event, target: HugeGridTarget)),
	 * 		onTouchContextMenuStart?: (function(event: JQueryEventObject|JQuery.Event, target: HugeGridTarget)),
	 * 		onTouchContextMenuCancel?: (function()),
	 * 		onTouchContextMenu?: (function(event: JQueryEventObject|JQuery.Event, target: HugeGridTarget)),
	 * 		onOver?: (function(target: HugeGridTarget)),
	 * 		onOut?: (function(target: HugeGridTarget)),
	 * 		onSelect?: (function(selection: HugeGridSelection)),
	 * 		onDeselect?: (function(selection: HugeGridSelection)),
	 * 		onLoad?: (function(rowIdxFrom: number, rowIdxTo: number)),
	 * 		onUnload?: (function(rowIdxFrom: number, rowIdxTo: number)),
	 * 		onScroll?: (function(hScrollPos: number, vScrollPos: number)),
	 * 		onError?: (function(resp: *)),
	 * 		onBlockHide?: (function(firstRowIdx: number, leftBlockDomElement: JQuery, rightBlockDomElement: JQuery)),
	 * 		onRowCountUpdate?: (function(filteredRows: number, unfilteredRows: number)),
	 * 		onBeforeRequestData?: (function(requestData: HugeGridAjaxRequest)),
	 * 		onRowDataReceived?: (function(response: HugeGridAjaxResponse)),
	 *      onViewUpdate?: (function(rowCount: number, firstVisibleRowIdx: number, lastVisibleRowIdx: number, previousFirstVisibleRowIdx: number, previousLastVisibleRowIdx: number)),
	 * 		sortFunctions?: Object.<HugeGridColumnId, function(colId: HugeGridColumnId, isDesc: boolean, a: HugeGridRow, b: HugeGridRow): number>
	 * }} HugeGridOptions
	 */

	/**
	 * @param {string} selector
	 * @param {HugeGridOptions} options
	 * @constructor
	 */
	var HugeGrid = function(selector, options) {
		var $this = $(selector);
		$this.data('hugeGrid', this);
		$this.addClass('huge-grid'); // one of first things to be done. otherwise some DOM event listeners might fail
		this.$grid = $this;
		var i, j, col;

		this.options = $.extend({}, HugeGrid.defaults, options);

		this.columnIndex = {};
		this.columnList = [];
		this.buildColumnIndex(this.options.header, null, false);

		if( !this.id )
			this.id = $this.attr('id');

		if( !this.id ) {
			this.id = 'hg' + HugeGrid.nextAutoId;
			HugeGrid.nextAutoId++;
		}

		if( this.options.selectionMinColumnId !== null ) {
			col = this.getHeader(this.options.selectionMinColumnId);
			this.selectionMinColumnIndex = col ? col.index : null;
			if( !col )
				this.options.selectionMode = 'none';
		}

		if( this.options.selectionMaxColumnId !== null ) {
			col = this.getHeader(this.options.selectionMaxColumnId);
			this.selectionMaxColumnIndex = col ? col.index : null;
			if( !col )
				this.options.selectionMode = 'none';
		}

		this.sortKey = this.options.sortKey;
		this.sortDesc = this.options.sortDesc;

		if( this.options.noSort )
			this.options.sortRowHeight = 0;

		this.dataParam = this.options.dataParam;

		if( this.options.filter !== null && typeof this.options.filter === 'object' ) {
			for( i in this.options.filter ) {
				if( !this.options.filter.hasOwnProperty(i) )
					continue;
				var filterDef = this.options.filter[i];
				if( !filterDef.hasOwnProperty('id') || !this.columnIndex.hasOwnProperty(filterDef.id) )
					continue;
				this.columnIndex[filterDef.id].filter = filterDef;
				this.hasFilters = true;
			}
		}

		// build initial filter data
		this.filterData = {};
		for( i in this.columnIndex ) {
			if( !this.columnIndex.hasOwnProperty(i) || !this.columnIndex[i].hasOwnProperty('filter') || !this.columnIndex[i].filter || !this.columnIndex[i].filter.hasOwnProperty('value') )
				continue;
			var type = this.columnIndex[i].filter.type;
			var val = this.columnIndex[i].filter.value;
			if( val !== null && val !== '' ) {
				if( type === 'number' || type === 'date' || type === 'time' ) {
					if( typeof val !== 'object' ) {
						this.filterData[i] = {from: val, to: val};
					}
					else {
						var fd = {};
						if( val.hasOwnProperty('from') && val.from !== null && val.from !== '' )
							fd.from = val.from;
						if( val.hasOwnProperty('to') && val.to !== null && val.to !== '' )
							fd.to = val.to;
						if( fd.hasOwnProperty('from') || fd.hasOwnProperty('to') )
							this.filterData[i] = fd;
					}
				}
				else if( typeof val === 'object' ) {
					if( !val.hasOwnProperty('length') || val.length > 0 )
						this.filterData[i] = val;
				}
				else
					this.filterData[i] = val;
			}
		}
		this.prevFilterData = JSON.stringify(this.filterData);

		if( typeof this.options.data === "string" ) {
			this.useAjaxLoading = true;
			this.readUrl = this.options.data; // @todo replace by another options for CRUD model
			this.data = [];
			this.dataIndex = {};
			if( this.rowCount <= 0 ) // ensure we try to load at least one block. when block loads it will return real row count
				this.rowCount = 1;
		}
		else {
			this.useAjaxLoading = false;
			this.prepareData(true, true, true);
		}
		this.dataSession = 0;

		var sizes = this.calculateSizes();

		this.contentWidth = sizes.contentWidth;
		this.headHeight = sizes.headLevels * (this.options.headRowHeight + 1) - 1;
		this.headWidth = sizes.headWidth;

		var innerHeadHeight = this.headHeight + this.options.sortRowHeight;
		this.fullHeadWidth = this.headWidth + this.options.splitterWidth - 1;

		if( this.hasFilters )
			innerHeadHeight += this.options.filterRowHeight + 1;

		this.fullHeadHeight = innerHeadHeight + this.options.splitterWidth;
		var fullFootHeight = (this.options.footer === null || typeof this.options.footer !== 'object' || !this.options.footer.hasOwnProperty('content')) ? 0 : (this.options.footerHeight + this.options.splitterWidth);

		this.contentHeight = (this.options.rowHeight + 1) * this.rowCount - 1;

		var $vis = $this.closest(':visible');

		var thisWidth = $vis.width();
		var thisHeight = $this.height();
		if( !this.useAjaxLoading && thisHeight === 0 ) {
			thisHeight = this.contentHeight + this.fullHeadHeight + fullFootHeight + this.options.hScrollHeight;
			$this.css({height: thisHeight + 'px' });
			this.options.vScrollWidth = 0;
			this.autoHeight = true;
		}

		this.containerWidth = thisWidth - this.fullHeadWidth - this.options.vScrollWidth;
		this.containerHeight = thisHeight - this.fullHeadHeight - fullFootHeight - this.options.hScrollHeight;

		if( fullFootHeight > 0 ) {
			this.$footerCorner =
				$('<div class="hg-footer-corner" />')
				.css({
					width: this.fullHeadWidth + "px",
					height: fullFootHeight + "px",
					left: 0,
					top: this.fullHeadHeight + this.containerHeight + 'px',
					position: "absolute",
					overflow: "hidden"
				});

			this.$footerRowContent =
				$('<div class="hg-footer-row-content" />')
				.css({
					width: this.contentWidth + "px",
					height: this.options.footerHeight + "px",
					position: "relative"
				});

			this.$footerRow =
				$('<div class="hg-footer-row" />')
				.css({
					width: this.containerWidth + "px",
					height: fullFootHeight + "px",
					left: this.fullHeadWidth + "px",
					top: this.fullHeadHeight + this.containerHeight + 'px',
					position: "absolute",
					overflow: "hidden"
				})
				.append(this.$footerRowContent);

			if( this.options.footer.hasOwnProperty('rowClass') ) {
				this.$footerCorner.addClass(this.options.footer.rowClass);
				this.$footerRowContent.addClass(this.options.footer.rowClass);
			}
		}

		this.$headCorner =
			$('<div class="hg-head-corner" />')
			.css({
				width: this.fullHeadWidth + "px",
				height: this.fullHeadHeight + "px",
				left: 0,
				top: 0,
				position: "absolute",
				overflow: "hidden"
			});

		this.$headRow =
			$('<div class="hg-head-row" />')
			.css({
				width: this.containerWidth + "px",
				height: this.fullHeadHeight + "px",
				left: this.fullHeadWidth + "px",
				top: 0,
				position: "absolute",
				overflow: "hidden"
			});

		this.$headCol =
			$('<div class="hg-head-column" />')
			.css({
				width: this.fullHeadWidth + "px",
				height: this.containerHeight + "px",
				left: 0,
				top: this.fullHeadHeight + "px",
				position: "absolute",
				overflow: "hidden"
			});

		this.$container =
			$('<div class="hg-container" />')
			.css({
				width: this.containerWidth + "px",
				height: this.containerHeight + "px",
				left: this.fullHeadWidth + "px",
				top: this.fullHeadHeight + "px",
				position: "absolute",
				overflow: "hidden"
			});

		this.$vScroll =
			(this.options.vScrollWidth > 0)
			? $('<div class="hg-vscroll" />')
					.css({
					width: this.options.vScrollWidth + "px",
					height: this.containerHeight + "px",
					right: 0,
					bottom: (this.options.hScrollHeight + fullFootHeight) + "px",
					position: "absolute"
				})
			: null;

		this.$hScroll =
			$('<div class="hg-hscroll" />')
			.css({
				width: this.containerWidth + "px",
				height: this.options.hScrollHeight + "px",
				right: this.options.vScrollWidth + "px",
				bottom: 0,
				position: "absolute"
			});

		this.$content =
			$('<div class="hg-content" />')
			.css({
				width: this.contentWidth + "px",
				height: this.contentHeight + "px",
				position: "relative"
			});

		this.$headCornerContent =
			$('<div class="hg-hcr-content" />')
			.css({
				width: this.headWidth + "px",
				height: innerHeadHeight + "px",
				position: "relative"
			});

		this.$headRowContent =
			$('<div class="hg-hrw-content" />')
			.css({
				width: this.contentWidth + "px",
				height: innerHeadHeight + "px",
				position: "relative"
			});

		this.$headColContent =
			$('<div class="hg-hcl-content" />')
			.css({
				width: this.headWidth + "px",
				height: this.contentHeight + "px",
				position: "relative"
			});

		this.$headColBorder =
			$('<div class="hg-hcl-border" />')
			.css({
				"min-height": this.containerHeight + "px"
			})
			.append(this.$headColContent);

		this.$vScrollTumb =
			(this.options.vScrollWidth > 0)
			? this.$vScroll
				.append(this.options.vScrollMarkup)
				.find('.hg-vscroll-tumb')
				.css({
					position: 'absolute',
					top: 0
				})
			: null;

		this.$hScrollTumb =
			this.$hScroll
			.append(this.options.hScrollMarkup)
			.find('.hg-hscroll-tumb')
			.css({
				position: 'absolute',
				left: 0
			});

		this.$headCorner
			.append($('<div class="hg-hcr-border" />')
			.append(this.$headCornerContent));

		this.$headRow
			.append(
				$('<div class="hg-hrw-border" />')
				.css({
					"min-width": this.containerWidth + "px"
				})
				.append(this.$headRowContent)
			);

		this.$headCol
			.append(this.$headColBorder);

		this.$container.append(this.$content);

		this.$dropDowns = $('<div class="hg-drop-downs" />');

		$this.css({position: "relative"});
		$this.append(this.$headCorner, this.$headRow, this.$headCol, this.$container);
		if( this.$footerCorner )
			$this.append(this.$footerCorner, this.$footerRow);
		$this.append(this.$hScroll);
		if( this.$vScroll )
			$this.append(this.$vScroll);
		$this.append(this.$dropDowns);
		
		if( this.$vScroll ) {
			this.$vScrollTumb.on("mousedown", this.onVScrollMouseDown.bind(this));
			this.$vScrollTumb.data("hugeGrid", [this, 0]);
			this.vScrollMax = Math.max(this.contentHeight - this.containerHeight - 1, 0);
			this.vScrollSize = this.$vScrollTumb.parent().innerHeight() - this.$vScrollTumb.outerHeight();
		}
		else {
			this.vScrollMax = this.vScrollSize = 0;
		}

		this.$hScrollTumb.on("mousedown", this.onHScrollMouseDown.bind(this));
		this.$hScrollTumb.data("hugeGrid", [this, 0]);
		this.hScrollMax = Math.max(this.contentWidth - this.containerWidth - 1, 0);
		this.hScrollSize = this.$hScrollTumb.parent().innerWidth() - this.$hScrollTumb.outerWidth();

		if( this.hScrollMax === 0 )
			this.$hScroll.css({display: 'none'});

		this.blocks = [];
		this.blockLevelSize = [];
		for( i = this.options.blockLevels - 1, j = this.options.blockSize; i >= 0; i--, j *= this.options.superblockSize ) {
			this.blockLevelSize[i] = j;
			this.blocks[i] = {};
		}

		this.loadQueue = {load: 0, req: {}};

		if( this.options.fixedColumns === 0 ) {
			this.$headCol.css({display: 'none'});
			this.$headCorner.css({display: 'none'});
			if( this.$footerCorner )
				this.$footerCorner.css({display: 'none'});
		}

		this.updateVisibleRowIndexes();
		this.initView();
		this.scrollTo(this.options.hScrollPos, this.options.vScrollPos);
	};

	/**
	 * Id of the grid. Must be unique.
	 * @type {string}
	 */
	HugeGrid.prototype.id = null;

	/**
	 * Contains an index of columns by their IDs.
	 * @type {Object.<HugeGridColumnId, HugeGridColumn>}
	 */
	HugeGrid.prototype.columnIndex = null;

	/**
	 * Contains a list of all topmost level column nodes (with no children) in their respective order.
	 * @type {Array.<HugeGridColumn>}
	 */
	HugeGrid.prototype.columnList = null;

	/**
	 * Reference to the last fixed column.
	 * @type {HugeGridColumn}
	 */
	HugeGrid.prototype.lastFixedColumn = null;

	/**
	 * Reference to the first unfixed column.
	 * @type {HugeGridColumn}
	 */
	HugeGrid.prototype.firstUnfixedColumn = null;

	/**
	 * @type {boolean}
	 */
	HugeGrid.prototype.hasFilters = false;

	/**
	 * @type {object}
	 */
	HugeGrid.prototype.filterData = null;

	/**
	 * @type {object}
	 */
	HugeGrid.prototype.prevFilterData = null;

	/**
	 * @type {HugeGridOptions}
	 */
	HugeGrid.prototype.options = null;

	/**
	 * @type {boolean}
	 */
	HugeGrid.prototype.useAjaxLoading = false;

	/**
	 * @type {object}
	 */
	HugeGrid.prototype.loadQueue = null;

	/**
	 * @type {string}
	 */
	HugeGrid.prototype.createUrl = null;

	/**
	 * @type {string}
	 */
	HugeGrid.prototype.readUrl = null;

	/**
	 * @type {string}
	 */
	HugeGrid.prototype.updateUrl = null;

	/**
	 * @type {string}
	 */
	HugeGrid.prototype.deleteUrl = null;

	/**
	 * @type {object}
	 */
	HugeGrid.prototype.data = null;

	/**
	 * @type {string}
	 */
	HugeGrid.prototype.dataParam = null;

	/**
	 * @type {string}
	 */
	HugeGrid.prototype.dataLost = false;

	/**
	 * @type {object}
	 */
	HugeGrid.prototype.dataIndex = null;

	/**
	 * @type {int}
	 */
	HugeGrid.prototype.dataSession = 0;

	/**
	 * @type {int}
	 */
	HugeGrid.prototype.rowCount = 0;

	/**
	 * @type {string}
	 */
	HugeGrid.prototype.sortKey = null;

	/**
	 * @type {boolean}
	 */
	HugeGrid.prototype.sortDesc = false;

	/**
	 * @type {object}
	 */
	HugeGrid.prototype.blocks = null;

	/**
	 * @type {object}
	 */
	HugeGrid.prototype.blockLevelSize = null;

	/**
	 * @type {int}
	 */
	HugeGrid.prototype.firstVisibleHBlockIdx = -1;

	/**
	 * @type {int}
	 */
	HugeGrid.prototype.lastVisibleHBlockIdx = -1;

	/**
	 * @type {int}
	 */
	HugeGrid.prototype.firstVisibleRowIdx = 0;

	/**
	 * @type {int}
	 */
	HugeGrid.prototype.lastVisibleRowIdx = 0;

	/**
	 * @type {object}
	 */
	HugeGrid.prototype.hBlocks = null;

	/**
	 * @type {boolean}
	 */
	HugeGrid.prototype.autoHeight = false;

	/**
	 * @type {int}
	 */
	HugeGrid.prototype.headWidth = 0;

	/**
	 * @type {int}
	 */
	HugeGrid.prototype.headHeight = 0;

	/**
	 * @type {int}
	 */
	HugeGrid.prototype.fullHeadWidth = 0;

	/**
	 * @type {int}
	 */
	HugeGrid.prototype.fullHeadHeight = 0;

	/**
	 * @type {int}
	 */
	HugeGrid.prototype.contentWidth = 0;

	/**
	 * @type {int}
	 */
	HugeGrid.prototype.contentHeight = 0;

	/**
	 * @type {int}
	 */
	HugeGrid.prototype.containerWidth = 0;

	/**
	 * @type {int}
	 */
	HugeGrid.prototype.containerHeight = 0;

	/**
	 * @type {int}
	 */
	HugeGrid.prototype.hScrollPos = 0;

	/**
	 * @type {int}
	 */
	HugeGrid.prototype.hScrollMax = 0;

	/**
	 * @type {int}
	 */
	HugeGrid.prototype.hScrollSize = 0;

	/**
	 * @type {int}
	 */
	HugeGrid.prototype.vScrollPos = 0;

	/**
	 * @type {int}
	 */
	HugeGrid.prototype.vScrollMax = 0;

	/**
	 * @type {int}
	 */
	HugeGrid.prototype.vScrollSize = 0;

	/**
	 * @type {JQuery}
	 */
	HugeGrid.prototype.$grid = null;

	/**
	 * @type {JQuery}
	 */
	HugeGrid.prototype.$rules = null;

	/**
	 * @type {JQuery}
	 */
	HugeGrid.prototype.$headCorner = null;

	/**
	 * @type {JQuery}
	 */
	HugeGrid.prototype.$headRow = null;

	/**
	 * @type {JQuery}
	 */
	HugeGrid.prototype.$headCol = null;

	/**
	 * @type {JQuery}
	 */
	HugeGrid.prototype.$container = null;

	/**
	 * @type {JQuery}
	 */
	HugeGrid.prototype.$vScroll = null;

	/**
	 * @type {JQuery}
	 */
	HugeGrid.prototype.$hScroll = null;

	/**
	 * @type {JQuery}
	 */
	HugeGrid.prototype.$content = null;

	/**
	 * @type {JQuery}
	 */
	HugeGrid.prototype.$headCornerContent = null;

	/**
	 * @type {JQuery}
	 */
	HugeGrid.prototype.$headRowContent = null;

	/**
	 * @type {JQuery}
	 */
	HugeGrid.prototype.$headColContent = null;

	/**
	 * @type {JQuery}
	 */
	HugeGrid.prototype.$headColBorder = null;

	/**
	 * @type {JQuery}
	 */
	HugeGrid.prototype.$footerCorner = null;

	/**
	 * @type {JQuery}
	 */
	HugeGrid.prototype.$footerRow = null;

	/**
	 * @type {JQuery}
	 */
	HugeGrid.prototype.$footerRowContent = null;

	/**
	 * @type {JQuery}
	 */
	HugeGrid.prototype.$dropDowns = null;

	/**
	 * @type {JQuery}
	 */
	HugeGrid.prototype.$hScrollTumb = null;

	/**
	 * @type {JQuery}
	 */
	HugeGrid.prototype.$vScrollTumb = null;

	/**
	 * Selection area element in left part of the grid
	 * @type {JQuery}
	 */
	HugeGrid.prototype.$selection1 = null;

	/**
	 * Selection area element in right part of the grid
	 * @type {JQuery}
	 */
	HugeGrid.prototype.$selection2 = null;

	/**
	 * @type {object}
	 */
	HugeGrid.prototype.selection = null;

	/**
	 * @type {HugeGridTracker}
	 */
	HugeGrid.prototype.tracker = null;

	/**
	 * @type {boolean}
	 */
	HugeGrid.prototype.temporaryPreventClick = false;

	/**
	 * @type {int}
	 */
	HugeGrid.prototype.selectionMinColumnIndex = null;

	/**
	 * @type {int}
	 */
	HugeGrid.prototype.selectionMaxColumnIndex = null;

	/**
	 * @type {object}
	 */
	HugeGrid.prototype.autoScroll = null;

	/**
	 * @type {object}
	 */
	HugeGrid.prototype.scrollDragInfo = null;

	HugeGrid.prototype.onHScrollMouseDown = function(e) {
		e.preventDefault();
		e.stopImmediatePropagation();
		var pos = this.$hScrollTumb.position().left;
		this.scrollDragInfo = {
			initialMousePos: e.pageX,
			initialPos: pos,
			currentPos: pos,
			prevPos: pos
		};
		$(window).on("mousemove", this.onHScrollMouseMove.bind(this)).on("mouseup", this.onHScrollMouseUp.bind(this));
	};
	
	HugeGrid.prototype.onHScrollMouseMove = function(e) {
		e.preventDefault();
		e.stopImmediatePropagation();
		this.scrollDragInfo.currentPos = this.scrollDragInfo.initialPos + e.pageX - this.scrollDragInfo.initialMousePos;
		if( this.scrollDragInfo.currentPos === this.scrollDragInfo.prevPos )
			return;
		this.scrollDragInfo.prevPos = this.scrollDragInfo.currentPos;
		if( this.scrollDragInfo.currentPos < 0 )
			this.scrollDragInfo.currentPos = 0;
		if( this.scrollDragInfo.currentPos > this.hScrollSize )
			this.scrollDragInfo.currentPos = this.hScrollSize;
		this.$hScrollTumb.css({
			left: this.scrollDragInfo.currentPos + "px"
		});
		
		var oldpos = this.hScrollPos;
		this.hScrollPos = Math.floor(this.scrollDragInfo.currentPos * this.hScrollMax / this.hScrollSize);
		var scpos = '-' + this.hScrollPos + "px";
		this.$content.css({left: scpos});
		this.$headRowContent.css({left: scpos});
		if( this.$footerCorner )
			this.$footerRowContent.css({left: scpos});

		this.refreshView();

		if( oldpos !== this.hScrollPos && typeof(this.options.onScroll) === "function" )
			this.options.onScroll.call(grid, this.hScrollPos, this.vScrollPos);
	};
			
	HugeGrid.prototype.onHScrollMouseUp = function(e) {
		e.preventDefault();
		e.stopImmediatePropagation();
		this.scrollDragInfo = null;
		$(window).off("mousemove mouseup");
	};

	HugeGrid.prototype.onVScrollMouseDown = function(e) {
		e.preventDefault();
		e.stopImmediatePropagation();
		var pos = this.$vScrollTumb.position().top;
		this.scrollDragInfo = {
			initialMousePos: e.pageY,
			initialPos: pos,
			currentPos: pos,
			prevPos: pos
		};
		$(window).on("mousemove", this.onVScrollMouseMove.bind(this)).on("mouseup", this.onVScrollMouseUp.bind(this));
	};
	
	HugeGrid.prototype.onVScrollMouseMove = function(e) {
		e.preventDefault();
		e.stopImmediatePropagation();
		this.scrollDragInfo.currentPos = this.scrollDragInfo.initialPos + e.pageY - this.scrollDragInfo.initialMousePos;
		if( this.scrollDragInfo.currentPos === this.scrollDragInfo.prevPos )
			return;
		this.scrollDragInfo.prevPos = this.scrollDragInfo.currentPos;
		if( this.scrollDragInfo.currentPos < 0 )
			this.scrollDragInfo.currentPos = 0;
		if( this.scrollDragInfo.currentPos > this.vScrollSize )
			this.scrollDragInfo.currentPos = this.vScrollSize;
		this.$vScrollTumb.css({
			top: this.scrollDragInfo.currentPos + "px"
		});

		var oldpos = this.vScrollPos;
		this.vScrollPos = Math.floor(this.scrollDragInfo.currentPos * this.vScrollMax / this.vScrollSize);
		var scpos = '-' + this.vScrollPos + "px";
		this.$content.css({top: scpos});
		this.$headColContent.css({top: scpos});

		this.updateVisibleRowIndexes();
		this.refreshView();
		this.processLoadingQueue();

		if( oldpos !== this.vScrollPos && typeof this.options.onScroll === "function" )
			this.options.onScroll.call(grid, this.hScrollPos, this.vScrollPos);
	};
	
	HugeGrid.prototype.onVScrollMouseUp = function(e) {
		e.preventDefault();
		e.stopImmediatePropagation();
		this.scrollDragInfo = null;
		$(window).off("mousemove mouseup");
	};

	HugeGrid.prototype.touchInfo = null;
	HugeGrid.prototype.touchScrollInfo = null;
	HugeGrid.prototype.lastTapTime = null;
	HugeGrid.prototype.lastTapTarget = null;

	HugeGrid.prototype.onTouchStart = function(e) {
		if( document.activeElement )
			$(document.activeElement).blur();
		if( typeof this.options.onTouchStart === "function" ) {
			if( this.options.onTouchStart.call(this, e, this.identifyTarget(e.target)) === false )
				return;
		}
		if( $(e.target).closest(".hg-head-column,.hg-container").length === 0 || $(e.target).closest(".hg-allow-touch").length !== 0 )
			return;

		if ( this.touchInfo !== null ) {
			if( this.touchInfo.contextMenuTimer ) {
				clearTimeout(this.touchInfo.contextMenuTimer);
				if( typeof this.options.onTouchContextMenuCancel === "function" )
					this.options.onTouchContextMenuCancel.call(this);
			}
		}

		e.preventDefault();
		e.stopImmediatePropagation();

		if( this.touchScrollInfo !== null ) {
			clearInterval(this.touchScrollInfo.timer);
			this.touchScrollInfo = null;
		}

		var contextMenuTimeout = (function(ev) {
			this.touchInfo.contextMenuTimer = null;
			if( typeof this.options.onTouchContextMenu === "function" ) {
				if( this.options.onTouchContextMenu.call(this, ev, this.identifyTarget(ev.target)) )
					this.touchInfo = null;
			}
		}).bind(this, e);

		var contextMenuTimer = null;
		if(
			typeof this.options.onTouchContextMenuStart !== "function"
			|| this.options.onTouchContextMenuStart.call(this, e, this.identifyTarget(e.target)) !== false
		)
			contextMenuTimer = setTimeout(contextMenuTimeout, 1000 * this.options.touchContextMenuTime);

		var time = (new Date()).getTime();
		var touch = e.originalEvent.changedTouches[0];
		this.touchInfo = {
			target: e.target,
			id: touch.identifier,
			isScrolling: false,
			contextMenuTimer: contextMenuTimer,
			time: time,
			startX: touch.pageX,
			startY: touch.pageY,
			lastX: touch.pageX,
			lastY: touch.pageY,
			deltaX: 0,
			deltaY: 0,
			speedX: 0,
			speedY: 0
		};
	};

	HugeGrid.prototype.onTouchMove = function(e) {
		if( typeof this.options.onTouchMove === "function" ) {
			if( this.options.onTouchMove.call(this, e, this.identifyTarget(e.target)) === false )
				return;
		}
		if( this.touchInfo === null )
			return;

		for( var i = e.originalEvent.changedTouches.length - 1; i >= 0; i-- ) {
			var touch = e.originalEvent.changedTouches[i];
			if( touch.identifier !== this.touchInfo.id )
				continue;
			//e.preventDefault();
			//e.stopImmediatePropagation();

			var time = (new Date()).getTime();
			var deltaTime = (time - this.touchInfo.time) / 1000;
			if( deltaTime === 0 )
				return;

			this.touchInfo.time = time;
			this.touchInfo.deltaX = touch.pageX - this.touchInfo.lastX;
			this.touchInfo.deltaY = touch.pageY - this.touchInfo.lastY;
			this.touchInfo.speedX = this.touchInfo.deltaX / deltaTime;
			this.touchInfo.speedY = this.touchInfo.deltaY / deltaTime;
			this.touchInfo.lastX = touch.pageX;
			this.touchInfo.lastY = touch.pageY;
			if( this.touchInfo.isScrolling ) {
				this.scrollBy(-this.touchInfo.deltaX, -this.touchInfo.deltaY);
			}
			else if( Math.abs(touch.pageX - this.touchInfo.startX) > this.options.touchScrollSensitivity || Math.abs(touch.pageY - this.touchInfo.startY) > this.options.touchScrollSensitivity ) {
				if( this.touchInfo.contextMenuTimer ) {
					clearTimeout(this.touchInfo.contextMenuTimer);
					if( typeof this.options.onTouchContextMenuCancel === "function" )
						this.options.onTouchContextMenuCancel.call(this);
				}
				this.touchInfo.contextMenuTimer = null;
				this.touchInfo.isScrolling = true;
				this.scrollBy(this.touchInfo.startX - touch.pageX, this.touchInfo.startY - touch.pageY);
			}
		}
	};

	HugeGrid.prototype.onTouchEnd = function(e) {
		if( typeof this.options.onTouchEnd === "function" ) {
			if( this.options.onTouchEnd.call(this, e, this.identifyTarget(e.target)) === false )
				return;
		}
		if( this.touchInfo === null )
			return;

		for( var i = e.originalEvent.changedTouches.length - 1; i >= 0; i-- ) {
			var touch = e.originalEvent.changedTouches[i];
			if( touch.identifier !== this.touchInfo.id )
				continue;
			e.preventDefault();
			e.stopImmediatePropagation();

			if( this.touchInfo.contextMenuTimer ) {
				clearTimeout(this.touchInfo.contextMenuTimer);
				if( typeof this.options.onTouchContextMenuCancel === "function" )
					this.options.onTouchContextMenuCancel.call(this);
			}

			var time = (new Date()).getTime();

			if( this.touchInfo.isScrolling ) {
				this.touchScrollInfo = {
					speedX: this.touchInfo.speedX,
					speedY: this.touchInfo.speedY,
					time: time,
					dampingX: 1000,
					dampingY: 1000,
					timer: setInterval((function() {
						var time = (new Date()).getTime();
						var deltaTime = (time - this.touchScrollInfo.time) / 1000;
						if( deltaTime === 0 )
							return;
						this.touchScrollInfo.time = time;
						this.scrollBy(-this.touchScrollInfo.speedX * deltaTime, -this.touchScrollInfo.speedY * deltaTime);
						if( this.touchScrollInfo.speedX < 0 ) {
							this.touchScrollInfo.speedX += this.touchScrollInfo.dampingX * deltaTime;
							if( this.touchScrollInfo.speedX > 0 )
								this.touchScrollInfo.speedX = 0;
						}
						else if( this.touchScrollInfo.speedX > 0 ) {
							this.touchScrollInfo.speedX -= this.touchScrollInfo.dampingX * deltaTime;
							if( this.touchScrollInfo.speedX < 0 )
								this.touchScrollInfo.speedX = 0;
						}
						if( this.touchScrollInfo.speedY < 0 ) {
							this.touchScrollInfo.speedY += this.touchScrollInfo.dampingY * deltaTime;
							if( this.touchScrollInfo.speedY > 0 )
								this.touchScrollInfo.speedY = 0;
						}
						else if( this.touchScrollInfo.speedY > 0 ) {
							this.touchScrollInfo.speedY -= this.touchScrollInfo.dampingY * deltaTime;
							if( this.touchScrollInfo.speedY < 0 )
								this.touchScrollInfo.speedY = 0;
						}
						if( this.touchScrollInfo.speedX === 0 && this.touchScrollInfo.speedY === 0 ) {
							clearInterval(this.touchScrollInfo.timer);
							this.touchScrollInfo = null;
						}
					}).bind(this), 10)
				};
			}
			else {
				var target = this.identifyTarget(e.target);
				if( typeof this.options.onTap === "function" )
					this.options.onTap.call(this, e, target);

				if( this.lastTapTime && this.lastTapTarget === e.target && time - this.lastTapTime < this.options.dblTapTime * 1000 && typeof this.options.onDblTap === "function" )
					this.options.onDblTap.call(this, e, target);

				this.lastTapTime = time;
				this.lastTapTarget = e.target;
			}

			this.touchInfo = null;
		}
	};

	HugeGrid.prototype.onTouchCancel = function(e) {
		if( this.touchInfo === null )
			return;

		for( var i = e.originalEvent.changedTouches.length - 1; i >= 0; i-- ) {
			var touch = e.originalEvent.changedTouches[i];
			if( touch.identifier !== this.touchInfo.id )
				continue;

			e.preventDefault();
			e.stopImmediatePropagation();

			this.touchInfo = null;
		}
	};
	/**
	 *
	 * @param {JQuery} $target
	 * @param {string} eventName
	 * @param {Object.<string, *>} [eventArgs]
	 * @return {JQueryEventObject|JQuery.Event}
	 */
	HugeGrid.prototype.triggerEvent = function($target, eventName, eventArgs) {
		var e = jQuery.Event(eventName + '.hugegrid');
		e.grid = this.$grid;
		if( typeof eventArgs === 'object' )
			for( var i in eventArgs )
				if( eventArgs.hasOwnProperty(i) )
					e[i] = eventArgs[i];
		$target.trigger(e);
		return e;
	};

	HugeGrid.prototype.scrollBy = function(hDelta, vDelta) {
		var hPos = this.hScrollPos + hDelta;
		var vPos = this.vScrollPos + vDelta;
		return this.scrollTo(hPos, vPos);
	};

	HugeGrid.prototype.scrollTo = function(hPos, vPos) {
		hPos = (hPos === null) ? this.hScrollPos : Math.max(0, Math.min(hPos, this.hScrollMax));
		vPos = (vPos === null) ? this.vScrollPos : Math.max(0, Math.min(vPos, this.vScrollMax));

		var scpos, stpos, scrolled = false;

		if( this.hScrollPos !== hPos ) {
			this.hScrollPos = hPos;
			scpos = '-' + this.hScrollPos + "px";
			stpos = Math.floor(this.hScrollPos * this.hScrollSize / this.hScrollMax) + "px";
			this.$content.css({left: scpos});
			this.$headRowContent.css({left: scpos});
			if( this.$footerCorner )
				this.$footerRowContent.css({left: scpos});
			this.$hScrollTumb.css({left: stpos});
			scrolled = true;
		}

		if( this.vScrollPos !== vPos ) {
			this.vScrollPos = vPos;
			scpos = '-' + this.vScrollPos + "px";
			stpos = Math.floor(this.vScrollPos * this.vScrollSize / this.vScrollMax);
			this.$content.css({top: scpos});
			this.$headColContent.css({top: scpos});
			if( this.$vScroll )
				this.$vScrollTumb.css({top: stpos});
			this.updateVisibleRowIndexes();
			scrolled = true;
		}

		if( scrolled ) {
			this.refreshView();
			this.processLoadingQueue();
		}

		if( scrolled && typeof(this.options.onScroll) === "function" )
			this.options.onScroll.call(this, this.hScrollPos, this.vScrollPos);
		
		return scrolled;
	};

	HugeGrid.prototype.sort = function(sortKey, sortDesc) {
		if( typeof(this.options.trackSorting) === 'object' && this.options.trackSorting ) {
			var data = this.options.trackSorting.hasOwnProperty('params') ? $.extend({}, this.options.trackSorting.params) : {};
			data.sortKey = sortKey;
			data.sortDesc = sortDesc ? 1 : 0;
			$.ajax({
				url: this.options.trackSorting.url,
				data: data,
				type: 'post',
				async: true
			});
		}

		this.sortKey = sortKey;
		this.sortDesc = sortDesc;

		if( this.useAjaxLoading )
			this.applySorting(); // need to do that here since reloadData does not trigger sorting event in ajax mode

		this.reloadData(true);
	};

	HugeGrid.prototype.serializeFilterData = function(data) {
		var filter = this.getFilterData();
		for( var i in filter )
			if( filter.hasOwnProperty(i) )
				data['filter[' + i + ']'] = filter[i];
	};

	HugeGrid.prototype.getFilterData = function() {
		return this.filterData;
	};

	HugeGrid.prototype.resetFilter = function() {
		this.filterData = {};
		$('.hg-filter-input', this.$grid).each(function() {
			var $this = $(this);
			if( $this.is('input') )
				$this.val('');
			else if( $this.is('select') )
				$this.val([]);
			else if( $this.is('.hg-ranged-filter-input') )
				$this.children('span').attr('title', '').text('');
		});
		this.prevFilterData = JSON.stringify(this.filterData);
	};

	HugeGrid.prototype.initView = function() {
		var i, j;
		var cornerHtml = '', rowHtml = '';
		var cornerSortHtml = '', rowSortHtml = '';
		var cornerFilterHtml = '', rowFilterHtml = '';
		var cornerFootHtml = '', rowFootHtml = '';
		var cssRules = '';
		var dropDownsHtml = '';
		var hb, hbIdx, prevHbIdx = -1, hbPos = 0, hbWidth = 0;

		this.hBlocks = [];
		for( i = 0, j = this.options.header.length - 1; j >= 0; i++, j-- ) {
			hb = i - this.options.fixedColumns;
			if( hb < 0 ) {
				cornerHtml += this.getHeadCellHtml(this.options.header[i], this.options.headRowHeight, this.headHeight, false, '', '');
				if( this.hasFilters ) {
					cornerFilterHtml += this.getFilterCellHtml(this.options.header[i], '', this.options.noSort ? 'nbb' : '');
					dropDownsHtml += this.getFilterCellDropDownHtml(this.options.header[i]);
				}
				if( !this.options.noSort )
					cornerSortHtml += this.getSortCellHtml(this.options.header[i], '', 'nbb');
				if( this.$footerCorner )
					cornerFootHtml += this.getFooterCellHtml(this.options.header[i], '');
			}
			else {
				var rightClass = (j > 0) ? '' : 'nrb';
				rowHtml += this.getHeadCellHtml(this.options.header[i], this.options.headRowHeight, this.headHeight, false, rightClass, '');
				if( this.hasFilters ) {
					rowFilterHtml += this.getFilterCellHtml(this.options.header[i], rightClass, this.options.noSort ? 'nbb' : '');
					dropDownsHtml += this.getFilterCellDropDownHtml(this.options.header[i]);
				}
				if( !this.options.noSort )
					rowSortHtml += this.getSortCellHtml(this.options.header[i], rightClass, 'nbb');
				if( this.$footerCorner )
					rowFootHtml += this.getFooterCellHtml(this.options.header[i], rightClass);

				hbIdx = Math.floor(hb / this.options.hBlockSize);
				if( hbIdx !== prevHbIdx ) {
					if( prevHbIdx >= 0 )
						this.hBlocks.push([hbPos, hbPos + (hbWidth ? (hbWidth - 1) : 0)]);

					hbPos += hbWidth;
					hbWidth = 0;
					cssRules += '.hg-' + this.id + '-hb-' + hbIdx + '{left:' + hbPos + 'px;}';
					prevHbIdx = hbIdx;
				}
				var hcw = this.getHeadCellWidth(this.options.header[i]);
				hbWidth += (hcw > 0) ? (hcw + 1) : 0;
			}
			cssRules += this.getCellCSS(this.options.header[i]);
		}

		if( prevHbIdx >= 0 )
			this.hBlocks.push([hbPos, hbPos + hbWidth - 1]);

		if( dropDownsHtml )
			this.$dropDowns.html(dropDownsHtml);

		cssRules += '.hg-' + this.id + '-filter{height:' + (this.options.filterRowHeight + 1) + 'px;}';
		cssRules += '.hg-' + this.id + '-sort{height:' + (this.options.sortRowHeight + 1 - this.options.splitterWidth) + 'px;}';
		cssRules += '.hg-' + this.id + '-row{height:' + (this.options.rowHeight + 1) + 'px;line-height:' + (this.options.rowHeight - 4) + 'px;}'; // line height = row height - padding
		cssRules += '.hg-' + this.id + '-lblock{position:absolute;left:0;width:' + this.headWidth + 'px;height:' + ((this.options.rowHeight + 1) * this.options.blockSize) + 'px;}';
		cssRules += '.hg-' + this.id + '-rblock{position:absolute;left:0;width:' + this.contentWidth + 'px;height:' + ((this.options.rowHeight + 1) * this.options.blockSize) + 'px;}';
		this.$rules = $('<style type="text/css">' + cssRules + '</style>');
		$("head").append(this.$rules);


		if( cornerFilterHtml )
			cornerHtml += cornerFilterHtml;
		if( cornerSortHtml )
			cornerHtml += cornerSortHtml;

		if( rowFilterHtml )
			rowHtml += '<div style="clear:both;"></div>' + rowFilterHtml;
		if( rowSortHtml )
			rowHtml += '<div style="clear:both;"></div>' + rowSortHtml;

		this.$headCornerContent.html(cornerHtml);
		this.$headRowContent.html(rowHtml);

		if( this.$footerCorner ) {
			this.$footerCorner.html(cornerFootHtml);
			this.$footerRowContent.html(rowFootHtml);
		}

		this.refreshView();

		this.$grid
			.on("keydown", ".hg-typeahead-attachment-point", function(e) {
				var key = ("which" in e) ? e.which : e.keyCode;
				if( key === 8 || key === 46 ) {
					var $this = $(this);
					var grid = $this.closest(".huge-grid").data('hugeGrid');
					var $filter = $this.closest(".hg-filter");
					var colId = $filter.data("key");
					var column = grid.getHeader(colId);
					if( column && column.filter && typeof column.filter.twitterTypeAheadValue === "function" ) {
						$filter.find(".hg-typeahead-value-target").val("").trigger("change");
						$filter.find(".hg-typeahead-attachment-point").val("");
					}
				}
			})
			.on("typeahead:select", function(e, item) {
				var grid = $(this).data('hugeGrid');
				var $this = $(e.target);
				var $filter = $this.closest(".hg-filter");
				var colId = $filter.data("key");
				var column = grid.getHeader(colId);
				if( column && column.filter && typeof column.filter.twitterTypeAheadValue === "function" ) {
					var val = column.filter.twitterTypeAheadValue(item);
					$filter.find(".hg-typeahead-value-target").val(val).trigger("change");
				}
			})
			.on('change', '.hg-mark', function(e) {
				$(this).closest('.huge-grid').data('hugeGrid').onMarkChange(e);
			})
			.on('keydown', ':input.hg-filter-input', function(e) {
				var key = e.keyCode || e.which;
				if( key === 13 ) {
					$(this).closest('.huge-grid').data('hugeGrid').onFilterChange(e);
					if( !$(e.target).is("select") ) {
						e.preventDefault();
						e.stopPropagation();
					}
				}
			})
			.on('blur', ':input.hg-filter-input', function(e) {
				$(this).closest('.huge-grid').data('hugeGrid').onFilterChange(e);
			})
			.on('change', ':input.hg-filter-input', function(e) {
				$(this).closest('.huge-grid').data('hugeGrid').onFilterChange(e);
			})
			.on('click', '.hg-sort-asc', function() {
				var $sort = $(this).closest('.hg-sort');
				var $grid = $sort.closest('.huge-grid');
				var inst = $grid.data('hugeGrid');
				inst.sort($sort.data('key'), false);
			})
			.on('click', '.hg-sort-desc', function() {
				var $sort = $(this).closest('.hg-sort');
				var $grid = $sort.closest('.huge-grid');
				var inst = $grid.data('hugeGrid');
				inst.sort($sort.data('key'), true);
			})
			.on('click', '.hg-ranged-filter-input', function() {
				if( HugeGrid.$activeDropDown !== null )
					HugeGrid.$activeDropDown.removeClass('active');

				var $target = $(this);
				var $dropDown = $('#' + $target.data('target'));
				$dropDown.toggleClass('active');
				if( $dropDown.is('.active') ) {
					var $grid = $dropDown.closest('.huge-grid');
					var inst = $grid.data('hugeGrid');
					var pos = inst.getCellDimensions(0, $target.data('col'));
					$dropDown.offset();
					var maxWidth = $grid.width();
					var width = $dropDown.outerWidth(false);
					var left = (pos.left + (pos.width - width) / 2);
					if( left > maxWidth - width )
						left = maxWidth - width;
					if( left < 0 )
						left = 0;
					$dropDown.css({
						left: left + 'px',
						top: (inst.headHeight + inst.options.filterRowHeight - 2) + 'px'
					});
					HugeGrid.$activeDropDown = $dropDown;
				}
				else
					HugeGrid.$activeDropDown = null;
			})
			.on("mouseover", function(e) { $(this).data("hugeGrid").onMouseOver(e); })
			.on("mouseout", function(e) { $(this).data("hugeGrid").onMouseOut(e); })
			.on("mouseup", function(e) { $(this).data("hugeGrid").onMouseUp(e); })
			.on("mousedown", function(e) { $(this).data("hugeGrid").onMouseDown(e); })
			.on("mousemove", function(e) { $(this).data("hugeGrid").onMouseMove(e); })
			.on("touchstart", this.onTouchStart.bind(this))
			.on("touchmove", this.onTouchMove.bind(this))
			.on("touchend", this.onTouchEnd.bind(this))
			.on("touchcancel", this.onTouchCancel.bind(this))
			.on("click", function(e) { $(this).data("hugeGrid").onClick(e); })
			.on("dblclick", function(e) { $(this).data("hugeGrid").onDblClick(e); });

		if( typeof initSpecialInputs === 'function' )
			initSpecialInputs();

		this.triggerEvent(this.$grid, 'init');

		this.processLoadingQueue();
	};

	HugeGrid.prototype.updateHorizontalBlocks = function() {
		var hbIdx, prevHbIdx = -1, hbPos = 0, hbWidth = 0;

		this.hBlocks = [];
		for( var i = this.options.fixedColumns, il = this.options.header.length; i < il; i++ ) {
			hbIdx = Math.floor((i - this.options.fixedColumns) / this.options.hBlockSize);
			if( hbIdx !== prevHbIdx ) {
				if( prevHbIdx >= 0 )
					this.hBlocks.push([hbPos, hbPos + (hbWidth ? (hbWidth - 1) : 0)]);

				hbPos += hbWidth;
				hbWidth = 0;
				this.replaceCSSRules('hg-' + this.id + '-hb-' + hbIdx, 'left:' + hbPos + 'px;');
				prevHbIdx = hbIdx;
			}
			var hcw = this.getHeadCellWidth(this.options.header[i]);
			hbWidth += (hcw > 0) ? (hcw + 1) : 0;
		}

		if( prevHbIdx >= 0 )
			this.hBlocks.push([hbPos, hbPos + hbWidth - 1]);
	};

	HugeGrid.prototype.onMarkChange = function(e) {
		var $target = $(e.target);
		var target = this.identifyTarget(e.target);
		if( target === null ) return; // should not happen
		target.event = e;

		this.markRow(target.rowIdx, $target.prop('checked'), true);

		if( this.triggerEvent($target, 'markchange', {originalEvent: e, gridTarget: target}).isPropagationStopped() )
			return;

		if( typeof(this.options.onMarkChange) === "function" )
			this.options.onMarkChange.call(this, target);
	};

	HugeGrid.prototype.updateFilterData = function() {
		var data = {};
		var gather = function() {
			var $this = $(this);
			var val = $this.val();
			if( val !== null && val !== '' ) {
				var col = $this.data('col');
				if( col )
					data[col] = val;
			}
		};
		$(':input.hg-filter-input', this.$headCornerContent).each(gather);
		$(':input.hg-filter-input', this.$headRowContent).each(gather);
		$(':input.hg-filter-input', this.$dropDowns).each(function() {
			var $this = $(this);
			var val = $this.val();
			if( val !== null && val !== '' ) {
				var col = $this.data('col');
				if( !data.hasOwnProperty(col) )
					data[col] = {};
				data[col][$this.data('range')] = val;
			}
		});
		this.filterData = data;
	};

	HugeGrid.prototype.onFilterChange = function(e) {
		var target = this.identifyTarget(e.target);
		if( target === null ) return;
		target.event = e;

		this.updateFilterData();

		if( target.hasOwnProperty('viewTarget') )
			$('#' + target.viewTarget).html(HugeGrid.getFilterRangeViewHtml(this.filterData.hasOwnProperty(target.colId) ? this.filterData[target.colId] : {}, this.columnIndex[target.colId].filter.type));

		var filterString = JSON.stringify(this.filterData);
		if( filterString !== this.prevFilterData ) {
			this.prevFilterData = filterString;
			var fe = this.triggerEvent($(e.target), 'filterchange', {originalEvent: e, gridTarget: target, filterData: this.filterData});

			var res = true;
			if( !fe.isPropagationStopped() )
				if( typeof(this.options.onFilterChange) === "function" )
					res = this.options.onFilterChange.call(this, target);

			if( (typeof res !== 'boolean' || res === true) && !fe.isDefaultPrevented() )
				this.reloadData(false);
		}
	};

	HugeGrid.prototype.beginCursorTracking = function(tracker) {
		if( tracker )
			this.$grid.addClass('hg-tracking');
		else
			this.$grid.removeClass('hg-tracking');
		this.tracker = tracker;
	};

	HugeGrid.prototype.onClick = function(e) {
		if( this.temporaryPreventClick ) {
			this.temporaryPreventClick = false;
			e.stopImmediatePropagation();
			e.preventDefault();
			return;
		}
		if( $(e.target).is('.hg-mark') )
			return;
		var target = this.identifyTarget(e.target);
		if( target === null ) return;
		target.event = e;
		if( typeof(this.options.onClick) === "function" )
			this.options.onClick.call(this, target);
	};

	HugeGrid.prototype.onDblClick = function(e) {
		if( $(e.target).is('.hg-mark') )
			return;
		var target = this.identifyTarget(e.target);
		if( target === null ) return;
		target.event = e;
		if( typeof(this.options.onDblClick) === "function" )
			this.options.onDblClick.call(this, target);
	};

	HugeGrid.prototype.onMouseOver = function(e) {
		HugeGrid.mouseOverGrid = this;
		var target = this.identifyTarget(e.target);
		if( target === null ) return;
		target.event = e;
		if( typeof(this.options.onOver) === "function" )
			this.options.onOver.call(this, target);
		if( !target.event.isDefaultPrevented() ) {
			if( typeof(target.rowIdx) !== 'undefined' && target.rowIdx !== null )
				$('#hgr1_' + this.id + '_' + target.rowIdx + ',#hgr2_' + this.id + '_' + target.rowIdx).addClass("hg-over");
		}

		if( target.type === 'data' ) {
			if( this.tracker ) {
				if( typeof this.tracker.move === 'function' )
					this.tracker.move.call(this.tracker, target, this);
			}
			else if( this.selection !== null && this.selection.active ) {
				var col = this.getHeader(target.colId);
				if( this.selectionMinColumnIndex && col.index < this.selectionMinColumnIndex )
					col = this.columnList[this.selectionMinColumnIndex];
				if( this.selectionMaxColumnIndex && col.index > this.selectionMaxColumnIndex )
					col = this.columnList[this.selectionMaxColumnIndex];
				var row = (this.options.selectionMode === 'single') ? this.selection.startedAt.row : target.rowIdx;

				if( typeof(this.options.onSelectionChange) === "function" )
					this.options.onSelectionChange.call(this, target);

				if( target.event.isDefaultPrevented() )
					return;

				this.select(this.selection.startedAt.row, this.selection.startedAt.column.id, row, col.id, true);
			}
		}

		if( (this.selection === null || !this.selection.active) && !this.tracker ) {
			if( target.type === 'data' && target.row.hasOwnProperty('tooltips') && target.row.tooltips.hasOwnProperty(target.colId) )
				HugeGrid.showToolTip(e, target.type + '.' + target.rowId + '.' + target.colId, target.row.tooltips[target.colId]);
			else if( target.type === 'range' && target.range.hasOwnProperty('tooltip') )
				HugeGrid.showToolTip(e, target.type + '.' + target.rowId + '.' + target.rangeId, target.range.tooltip);
		}
	};

	HugeGrid.prototype.onMouseOut = function(e) {
		HugeGrid.mouseOverGrid = null;
		HugeGrid.hideToolTip(false);

		var target = this.identifyTarget(e.target);
		if( target === null ) return;
		target.event = e;
		if( typeof(this.options.onOut) === "function" )
			this.options.onOut.call(this, target);
		if( !target.event.isDefaultPrevented() ) {
			if( typeof(target.rowIdx) !== 'undefined' && target.rowIdx !== null )
				$('#hgr1_' + this.id + '_' + target.rowIdx + ',#hgr2_' + this.id + '_' + target.rowIdx).removeClass("hg-over");
		}
	};

	HugeGrid.prototype.onMouseDown = function(e) {
		if( $(e.target).is('.hg-mark') )
			return;
		var target = this.identifyTarget(e.target);
		if( target === null ) return;
		$.hugeGrid.gridTrackingMouseUp = this;
		if( target.type !== 'data' ) return;

		target.event = e;
		if( typeof(this.options.onMouseDown) === "function" )
			this.options.onMouseDown.call(this, target);

		if( !this.tracker && this.options.selectionMode !== 'none' && target.type === 'data' ) {
			if( target.event.isDefaultPrevented() )
				return;

			this.deselect();
			var col = this.getHeader(target.colId);
			if( (this.selectionMinColumnIndex && col.index < this.selectionMinColumnIndex) || (this.selectionMaxColumnIndex && col.index > this.selectionMaxColumnIndex) )
				return;

			if( typeof(this.options.onSelectionStart) === "function" )
				this.options.onSelectionStart.call(this, target);

			if( target.event.isDefaultPrevented() )
				return;

			this.select(target.rowIdx, target.colId, target.rowIdx, target.colId, true);
		}
	};

	HugeGrid.prototype.onMouseUp = function(e) {
		var target;
		if( this.tracker ) {
			e.preventDefault();
			e.stopPropagation();
			e.stopImmediatePropagation();
			this.temporaryPreventClick = true;
			setTimeout((function() { this.temporaryPreventClick = false; }).bind(this), 10);

			var tracker = this.tracker;
			this.tracker = null;

			target = this.identifyTarget(e.target);

			this.$grid.removeClass('hg-tracking');

			if( typeof tracker.end === 'function' )
				tracker.end.call(tracker, target, this);
		}

		if( $(e.target).is('.hg-mark') )
			return;

		if( this.selection !== null && this.selection.active ) {
			target = this.identifyTarget(e.target);

			if( target === null )
				target = { type: 'outside' };

			target.event = e;

			if( typeof(this.options.onSelectionEnd) === "function" )
				this.options.onSelectionEnd.call(this, target);

			if( target.event.isDefaultPrevented() )
				return;

			this.selection.active = false;

			if( this.autoScroll !== null && this.autoScroll.timer ) {
				clearInterval(this.autoScroll.timer);
				this.autoScroll = null;
			}

			if( typeof(this.options.onSelect) === 'function' )
				this.options.onSelect.call(this, this.selection);
		}
	};

	HugeGrid.prototype.onMouseMove = function(e) {
		if( this.tracker || (this.selection !== null && this.selection.active) ) {
			this.autoScrollTick(e);
		}
	};

	HugeGrid.prototype.autoScrollTick = function(e) {
		if( typeof(e) !== 'object' && this.autoScroll === null )
			return;
		if( !this.tracker && (!this.selection || !this.selection.active) )
			return;

		if( this.autoScroll === null ) {
			this.autoScroll = {
				timer: null,
				lastTick: (new Date()).getTime()
			};
		}
		if( typeof(e) === 'object' ) {
			this.autoScroll.cursorX = e.pageX;
			this.autoScroll.cursorY = e.pageY;
		}

		var time = (new Date()).getTime();
		var deltaTime = (time - this.autoScroll.lastTick) / 1000;
		this.autoScroll.lastTick = time;

		var pos = this.$container.offset();
		var w = Math.min(100, this.containerWidth / 2);
		var h = Math.min(100, this.containerHeight / 2);
		if( w === 0 ) w = 1; // should not happen
		if( h === 0 ) h = 1; // should not happen

		var deltaX = 0, deltaY = 0;
		var speed = 500;

		if( this.autoScroll.cursorX < pos.left + w )
			deltaX = speed * (this.autoScroll.cursorX - pos.left - w) * deltaTime / w;
		else if( this.autoScroll.cursorX > pos.left + this.containerWidth - w )
			deltaX = speed * (this.autoScroll.cursorX - pos.left - this.containerWidth + w) * deltaTime / w;
		if( this.selectionMode !== 'single' ) {
			if( this.autoScroll.cursorY < pos.top + h )
				deltaY = speed * (this.autoScroll.cursorY - pos.top - h) * deltaTime / w;
			else if( this.autoScroll.cursorY > pos.top + this.containerHeight - h )
				deltaY = speed * (this.autoScroll.cursorY - pos.top - this.containerHeight + h) * deltaTime / w;
		}

		if( deltaX !== 0 || deltaY !== 0 ) {
			if( this.autoScroll.timer === null ) {
				var thisObj = this;
				this.autoScroll.timer = setInterval(function() {
					thisObj.autoScrollTick();
				}, 20);
			}
			this.scrollBy(deltaX, deltaY);

			var $win = $(window);
			var elem = document.elementFromPoint(this.autoScroll.cursorX - $win.scrollLeft(), this.autoScroll.cursorY - $win.scrollTop());
			var target = this.identifyTarget(elem);
			if( target !== null && target.type !== 'range' ) {
				if( this.tracker ) {
					if( typeof this.tracker.move === 'function' )
						this.tracker.move.call(this.tracker, target, this);
				}
				else {
					var col = this.getHeader(target.colId);
					if( this.selectionMinColumnIndex && col.index < this.selectionMinColumnIndex )
						col = this.columnList[this.selectionMinColumnIndex];
					if( this.selectionMaxColumnIndex && col.index > this.selectionMaxColumnIndex )
						col = this.columnList[this.selectionMaxColumnIndex];
					var row = (this.options.selectionMode === 'single') ? this.selection.startedAt.row : target.rowIdx;

					target.event = {
						target: elem,
						defaultPrevented: false,
						preventDefault: function() { this.defaultPrevented = true; },
						isDefaultPrevented: function() { return this.defaultPrevented; }
					};

					if( typeof(this.options.onSelectionChange) === "function" )
						this.options.onSelectionChange.call(this, target);

					if( target.event.isDefaultPrevented() )
						return;

					this.select(this.selection.startedAt.row, this.selection.startedAt.column.id, row, col.id, true);
				}
			}
		}
		else if( this.autoScroll.timer !== null ) {
			clearInterval(this.autoScroll.timer);
			this.autoScroll = null;
		}
	};

	HugeGrid.prototype.deselect = function() {
		var prevSelection = this.selection;
		this.selection = null;

		if( prevSelection !== null && typeof(this.options.onDeselect) === 'function' )
			this.options.onDeselect.call(this, prevSelection);

		this.updateSelectionDisplay();
	};

	HugeGrid.prototype.select = function(rowIdx1, colId1, rowIdx2, colId2, active) {
		var t;
		if( typeof(active) !== 'boolean' )
			active = false;
		if( rowIdx1 > rowIdx2 ) { t = rowIdx1; rowIdx1 = rowIdx2; rowIdx2 = t; }
		var col1 = this.getHeader(colId1);
		var col2 = this.getHeader(colId2);
		if( rowIdx1 < 0 || rowIdx2 < 0 || rowIdx1 >= this.rowCount || rowIdx2 >= this.rowCount || !col1 || !col2 )
			return false;
		if( col1.index > col2.index ) { t = col1; col1 = col2; col2 = t; }
		if( this.selection === null || !this.selection.active )
			this.selection = {
				active: active,
				startedAt: { row: rowIdx1, column: col1 }
			};
		this.selection.from = { row: rowIdx1, column: col1 };
		this.selection.to = { row: rowIdx2, column: col2 };

		if( typeof(this.options.onSelect) === 'function' )
			this.options.onSelect.call(this, this.selection);

		this.updateSelectionDisplay();
	};

	HugeGrid.prototype.updateSelectionDisplay = function() {
		if( this.selection === null ) {
			if( this.$selection1 ) {
				this.$selection1.remove();
				this.$selection1 = null;
			}
			if( this.$selection2 ) {
				this.$selection2.remove();
				this.$selection2 = null;
			}
		}
		else if( this.selection !== null ) {
			if( this.selection.from.column.fixed ) {
				if( !this.$selection1 ) {
					this.$selection1 = $('<div class="hg-selection"></div>');
					this.$headCol.append(this.$selection1);
				}
				var lastCol;
				if( this.selection.to.column.fixed ) {
					this.$selection1.removeClass('hg-selection-span-right');
					lastCol = this.selection.to.column;
				}
				else {
					this.$selection1.addClass('hg-selection-span-right');
					lastCol = this.lastFixedColumn;
				}
				this.setSelectionCSS(this.$selection1, this.selection.from.column, lastCol);
			}
			else if( this.$selection1 ) {
				this.$selection1.remove();
				this.$selection1 = null;
			}

			if( !this.selection.to.column.fixed ) {
				if( !this.$selection2 ) {
					this.$selection2 = $('<div class="hg-selection"></div>');
					this.$content.append(this.$selection2);
				}
				var firstCol;
				if( this.selection.from.column.fixed ) {
					this.$selection2.addClass('hg-selection-span-left');
					firstCol = this.firstUnfixedColumn;
				}
				else {
					this.$selection2.removeClass('hg-selection-span-left');
					firstCol = this.selection.from.column;
				}
				this.setSelectionCSS(this.$selection2, firstCol, this.selection.to.column);
			}
			else if( this.$selection2 ) {
				this.$selection2.remove();
				this.$selection2 = null;
			}
		}
	};

	HugeGrid.prototype.setSelectionCSS = function($element, col1, col2) {
		var h = (this.options.rowHeight + 1);
		$element.css({
			top: (this.selection.from.row * h) + 'px',
			height: ((this.selection.to.row - this.selection.from.row + 1) * h - 1) + 'px',
			left: col1.position + 'px',
			width: (col2.position - col1.position + col2.width) + 'px'
		});
	};


	HugeGrid.prototype.getCellDimensions = function(rowIdx, colId) {
		var col = this.getHeader(colId);
		var h = this.options.rowHeight;

		return {
			left: col.fixed ? (col.position) : (this.fullHeadWidth + col.position - this.hScrollPos),
			top: this.fullHeadHeight + (h + 1) * rowIdx - this.vScrollPos,
			width: col.width,
			height: h
		};
	};

	HugeGrid.prototype.markRow = function(rowIdx, mark, manual) {
		var $rowL = $('#hgr1_' + this.id + '_' + rowIdx);
		var $rowR = $('#hgr2_' + this.id + '_' + rowIdx);

		if( mark ) {
			$rowL.addClass("hg-marked-row");
			$rowR.addClass('hg-marked-row');
		}
		else {
			$rowL.removeClass("hg-marked-row");
			$rowR.removeClass('hg-marked-row');
		}

		if( typeof(manual) !== 'boolean' || !manual )
			$('.hg-mark', $rowL).prop('checked', mark);

		this.data[rowIdx].marked = mark;
	};

	HugeGrid.prototype.setData = function(data, dataParam) {
		var newHeight;
		if( this.autoHeight )
			newHeight = this.$grid.height() - this.data.length * (this.options.rowHeight + 1);

		this.options.data = data;
		this.options.dataParam = dataParam;

		this.reloadData(false);

		if( this.autoHeight ) {
			newHeight += this.data.length * (this.options.rowHeight + 1);
			this.$grid.css({
				height: newHeight + 'px'
			});
		}
		
		this.update();
	};

	HugeGrid.prototype.prepareData = function(applyFilter, applySorting, firstCall) {
		if( this.useAjaxLoading )
			return;

		if( applyFilter ) {
			this.applyFilter();
			this.dataParam = this.options.dataParam;
		}

		if( applySorting ) {
			// This trigger is needed when custom sort function was not given in initialization options (due to
			// PHP widget limitations) and since setting custom sort function on init event will be too late.
			// When event is triggered the grid will not be entirely ready, but at least grid data will be.
			if( firstCall )
				this.triggerEvent(this.$grid, 'beforefirstsort');

			this.applySorting();
		}
	};

	HugeGrid.parseDate = function(date) {
		if( date === null || /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(date) )
			return date;
		var matches = /^([0-9]{2})\.([0-9]{2})\.([0-9]{4})$/.exec(date);
		if( matches === null )
			return null;
		return matches[3] + '-' + matches[2] + '-' + matches[1];
	};

	HugeGrid.prototype.applyFilter = function() {
		var i, j, k, ok, src, row, val, filterVal, filterType;
		var filter = $.extend({}, this.getFilterData());

		i = 0;
		for( k in filter ) {
			if( !filter.hasOwnProperty(k) )
				continue;
			i++;
			filterType = this.columnIndex[k].filter.type;
			if( filterType === 'text' )
				filter[k] = filter[k].toLowerCase();
			else if( filterType === 'date' || filterType === 'time' || filterType === 'number' ) {
				if( typeof(filter[k]) !== 'object' )
					filter[k] = {from: filter[k], to: filter[k]};

				if( filterType === 'date' ) {
					filter[k].from = filter[k].hasOwnProperty('from') ? HugeGrid.parseDate(filter[k].from) : null;
					filter[k].to = filter[k].hasOwnProperty('to') ? HugeGrid.parseDate(filter[k].to) : null;
				}
				else if( filterType === 'number' ) {
					filter[k].from = (!filter[k].hasOwnProperty('from') || filter[k].from === null) ? null : parseFloat(filter[k].from);
					if( isNaN(filter[k].from) )
						filter[k].from = null;

					filter[k].to = (!filter[k].hasOwnProperty('to') || filter[k].to === null) ? null : parseFloat(filter[k].to);
					if( isNaN(filter[k].to) )
						filter[k].to = null;
				}

				if( filter[k].from === null && filter[k].to === null )
					delete filter[k];
				else if( filter[k].from === null )
					delete filter[k].from;
				else if( filter[k].to === null )
					delete filter[k].to;
			}
		}

		if( i === 0 ) {
			this.data = src = this.options.data;
			this.dataIndex = {};
			for( i in src ) {
				if( !src.hasOwnProperty(i) ) // src is an array, not object, so this might not be needed
					continue;
				this.dataIndex[src[i].id] = src[i];
			}
		}
		else {
			src = this.options.data;
			this.data = [];
			this.dataIndex = {};

			for( i in src ) {
				if( !src.hasOwnProperty(i) ) // src is an array, not object, so this might not be needed
					continue;
				row = src[i];
				ok = true;
				for( k in filter ) {
					if( !filter.hasOwnProperty(k) )
						continue;

					filterType = this.columnIndex[k].filter.type;
					filterVal = filter[k];
					val = (row.hasOwnProperty('data') && row.data.hasOwnProperty(k)) ? row.data[k] : ((row.hasOwnProperty('content') && row.content.hasOwnProperty(k)) ? row.content[k] : null);

					if( filterType === 'text' ) {
						if( val === null || val.toLowerCase().indexOf(filterVal) < 0 ) {
							ok = false;
							break;
						}
					}
					else if( filterType === 'date' ) {
						val = HugeGrid.parseDate(val);
						if( val === null || (filterVal.hasOwnProperty('from') && val < filterVal.from) || (filterVal.hasOwnProperty('to') && val > filterVal.to) ) {
							ok = false;
							break;
						}
					}
					else if( filterType === 'number' ) {
						val = parseFloat(val);
						if( isNaN(val) || (filterVal.hasOwnProperty('from') && val < filterVal.from) || (filterVal.hasOwnProperty('to') && val > filterVal.to) ) {
							ok = false;
							break;
						}
					}
					else if( filterType === 'time' ) {
						if( val === null || (filterVal.hasOwnProperty('from') && val < filterVal.from) || (filterVal.hasOwnProperty('to') && val > filterVal.to) ) {
							ok = false;
							break;
						}
					}
					else if( filterType === 'select' ) {
						ok = false;
						if( typeof filterVal === "object" ) {
							for( j in filterVal )
								if( filterVal.hasOwnProperty(j) && filterVal[j] === val ) {
									ok = true;
									break;
								}
						}
						else
							ok = filterVal === val;
						if( !ok )
							break;
					}
					else if( val !== filterVal ) {
						ok = false;
						break;
					}
				}
				if( ok ) {
					this.data.push(row);
					this.dataIndex[row.id] = row;
				}
			}
		}

		this.rowCount = this.data.length;
	};

	HugeGrid.prototype.applySorting = function() {
		if( this.triggerEvent(this.$grid, 'sort', {sortKey: this.sortKey, sortDesc: this.sortDesc}).isDefaultPrevented() )
			return;

		if( typeof(this.options.onSort) === "function" )
			if( this.options.onSort.call(this, this.sortKey, this.sortDesc) )
				return;

		$(".hg-sort-selected", this.$grid).removeClass("hg-sort-selected");
		if( this.sortKey )
			$("#hgsc_" + this.id + '_' + this.sortKey).find(".hg-sort-" + (this.sortDesc ? "desc" : "asc")).addClass("hg-sort-selected");
	};

	HugeGrid.prototype.reloadData = function(sortOnly) {
		this.dataSession++; // increment value so already executed ajax requests would not be valid anymore
		var i;

		if( this.useAjaxLoading ) {
			this.data = [];
			this.dataIndex = {};
			if( this.rowCount <= 0 ) // prevent from "hanging up"
				this.rowCount = 1;
		}
		else {
			this.prepareData(!sortOnly, true, false);
		}

		for( i in this.blocks[this.options.blockLevels - 1] ) {
			if( !this.blocks[this.options.blockLevels - 1].hasOwnProperty(i) )
				continue;
			var block = this.blocks[this.options.blockLevels - 1][i];
			if( block.visible )
				$("#hgb1_" + this.id + '_' + i + ", #hgb2_" + this.id + '_' + i).remove();
		}

		this.blocks = [];
		for( i = this.options.blockLevels - 1; i >= 0; i-- )
			this.blocks[i] = {};

		this.loadQueue.req = {};

		this.refreshFooterHTML();

		this.refreshView();
		this.processLoadingQueue();
		this.deselect();
	};

	HugeGrid.prototype.getHeadCellLevels = function(cellInfo) {
		if( cellInfo.children === null ) return 1;
		var levels = 0;
		for(var i = cellInfo.children.length - 1; i >= 0; i--)
			levels = Math.max(levels, this.getHeadCellLevels(cellInfo.children[i]));
		return levels + 1;
	};

	HugeGrid.prototype.getHeadCellWidth = function(cellInfo) {
		if( cellInfo.hidden ) return 0;
		if( cellInfo.children === null ) return cellInfo.width;
		var width = 0;
		for(var i = cellInfo.children.length - 1; i >= 0; i--) {
			var w = this.getHeadCellWidth(cellInfo.children[i]);
			width += (w > 0) ? (w + 1) : 0;
		}
		return (width > 0) ? (width - 1) : 0;
	};

	/*
	* rowHeight - height of a single row
	* headHeight - total height of all rows in header
	* ignoreChildren - don't render cell's children
	* rightClass - class to add to rightmost cells (always addded if has no children)
	* bottomClass - class to add to bottommost cells (always addded if has no children)
	*/
	HugeGrid.prototype.getHeadCellHtml = function(cellInfo, rowHeight, headHeight, ignoreChildren, rightClass, bottomClass) {
		var html = '';
		if( cellInfo.children === null || ignoreChildren ) {
			var ccls = ' ' + this.getColumnClasses(cellInfo.id);
			var title = cellInfo.hasOwnProperty('title') ? cellInfo.title : '';
			html += '<div id="hghc_' + this.id + '_' + cellInfo.id + '" class="hg-cell hg-th ' + rightClass + ' ' + bottomClass + ' hg-' + this.id + '-ds-' + cellInfo.id + ' hg-' + this.id + '-col-' + cellInfo.id + ccls + '" style="height:' + (headHeight + 1) + 'px;line-height:' + (headHeight - 4) + 'px;" title="' + title + '"><span>' + cellInfo.content + '</span></div>';
		}
		else {
			var hcw = this.getHeadCellWidth(cellInfo);
			html += '<div id="hghm_' + this.id + '_' + cellInfo.id + '" class="hg-th-multi hg-' + this.id + '-col-' + cellInfo.id + '" style="width:' + (hcw + 1) + 'px;height:' + (headHeight + 1) + 'px;">';
			html += this.getHeadCellHtml(cellInfo, rowHeight, rowHeight, true, rightClass, '');
			for(var i = cellInfo.children.length - 1, j = 0; i >= 0; i--, j++)
				html += this.getHeadCellHtml(cellInfo.children[j], rowHeight, headHeight - rowHeight - 1, false, ((i === 0) ? rightClass : ''), bottomClass);
			html += '</div>';
		}
		return html;
	};

	HugeGrid.prototype.getFilterCellDropDownHtml = function(cellInfo) {
		var html = '', i, j, from, to;
		if( cellInfo.children === null ) {
			var filter = cellInfo.filter;
			var colId = 'data-col="' + HugeGrid.htmlspecialchars(cellInfo.id) + '"';

			if( filter && (filter.type === 'date' || filter.type === 'time' || filter.type === 'number') ) {
				if( filter.hasOwnProperty('value') ) {
					if( typeof filter.value !== 'object' )
						from = to = filter.value;
					else {
						from = filter.value.hasOwnProperty('from') ? filter.value.from : '';
						to = filter.value.hasOwnProperty('to') ? filter.value.to : '';
					}
					if( from === null )
						from = '';
					if( to === null )
						to = '';
				}
				else
					from = to = '';

				html += '<div class="hg-drop-down" id="hgdd_' + this.id + '_' + cellInfo.id + '" ' + colId + ' data-target="hgri_' + this.id + '_' + cellInfo.id + '">';

				var showFrom = ("showFrom" in filter) ? filter.showFrom : true;
				var showTo = ("showTo" in filter) ? filter.showTo : true;
				switch( filter.type ) {
					case 'number': {
						html += showFrom ? '<input class="hg-filter-input hg-filter-number" type="text" value="' + HugeGrid.htmlspecialchars(from) + '"' + colId + ' data-range="from" />' : '';
						html += (showFrom && showTo) ? ' - ' : '';
						html += showTo ? '<input class="hg-filter-input hg-filter-number" type="text" value="' + HugeGrid.htmlspecialchars(to) + '"' + colId + ' data-range="to" />' : '';
						break;
					}
					case 'date': {
						html += showFrom ? '<input class="hg-filter-input hg-filter-date calendar-input" type="text" value="' + HugeGrid.htmlspecialchars(from) + '"' + colId + ' data-range="from" />' : '';
						html += (showFrom && showTo) ? ' - ' : '';
						html += showTo ? '<input class="hg-filter-input hg-filter-date calendar-input" type="text" value="' + HugeGrid.htmlspecialchars(to) + '"' + colId + ' data-range="to" />' : '';
						break;
					}
					case 'time': {
						html += showFrom ? '<input class="hg-filter-input hg-filter-time short" type="text" value="' + HugeGrid.htmlspecialchars(from) + '"' + colId + ' data-range="from" placeholder="HH:MM" />' : '';
						html += (showFrom && showTo) ? ' - ' : '';
						html += showTo ? '<input class="hg-filter-input hg-filter-time short" type="text" value="' + HugeGrid.htmlspecialchars(to) + '"' + colId + ' data-range="to" placeholder="HH:MM" />' : '';
						break;
					}
				}

				html += '</div>';
			}
		}
		else {
			for( i = 0, j = cellInfo.children.length - 1; i <= j; i++)
				html += this.getFilterCellDropDownHtml(cellInfo.children[i]);
		}
		return html;
	};

	HugeGrid.prototype.getFilterCellHtml = function(cellInfo, rightClass, bottomClass) {
		var html = '', i, j;
		if( cellInfo.children === null ) {
			var ccls = ' ' + this.getColumnClasses(cellInfo.id);
			var markup = '';
			var filter = cellInfo.filter;
			var colId = 'data-col="' + HugeGrid.htmlspecialchars(cellInfo.id) + '"';

			if( filter ) {
				switch( filter.type ) {
					case 'text': {
						if( typeof filter.twitterTypeAheadValue === "function" ) {
							markup += '<input class="hg-typeahead-value-target hg-filter-input hg-filter-text" type="hidden" value="' + (filter.hasOwnProperty('value') ? HugeGrid.htmlspecialchars(filter.value) : '') + '" ' + colId + ' />';
							markup += '<input class="hg-typeahead-attachment-point hg-filter-input hg-filter-text" type="text" value="' + (filter.hasOwnProperty('text') ? HugeGrid.htmlspecialchars(filter.text) : (filter.hasOwnProperty('value') ? HugeGrid.htmlspecialchars(filter.value) : '')) + '" />';
						}
						else {
							markup += '<input class="hg-filter-input hg-filter-text" type="text" value="' + (filter.hasOwnProperty('value') ? HugeGrid.htmlspecialchars(filter.value) : '') + '" ' + colId + ' />';
						}
						break;
					}
					case 'number': {
						markup += '<div class="hg-filter-input hg-ranged-filter-input" data-target="hgdd_' + this.id + '_' + cellInfo.id + '" id="hgri_' + this.id + '_' + cellInfo.id + '" ' + colId + '>' + HugeGrid.getFilterRangeViewHtml(filter.hasOwnProperty('value') ? filter.value : {}, filter.type) + '</div>';
						break;
					}
					case 'date': {
						markup += '<div class="hg-filter-input hg-ranged-filter-input hg-date-range" data-target="hgdd_' + this.id + '_' + cellInfo.id + '" id="hgri_' + this.id + '_' + cellInfo.id + '" ' + colId + '>' + HugeGrid.getFilterRangeViewHtml(filter.hasOwnProperty('value') ? filter.value : {}, filter.type) + '</div>';
						break;
					}
					case 'time': {
						markup += '<div class="hg-filter-input hg-ranged-filter-input" data-target="hgdd_' + this.id + '_' + cellInfo.id + '" id="hgri_' + this.id + '_' + cellInfo.id + '" ' + colId + '>' + HugeGrid.getFilterRangeViewHtml(filter.hasOwnProperty('value') ? filter.value : {}, filter.type) + '</div>';
						break;
					}
					case 'select': {
						var idx = {};
						if( filter.hasOwnProperty('value') && filter.value && typeof(filter.value) === 'object' ) {
							for( i in filter.value )
								if( filter.value.hasOwnProperty(i) )
									idx[filter.value[i]] = i;
						}
						var customSelectClass = ("customSelectClass" in filter) ? filter.customSelectClass : "custom-select";
						markup += '<select class="hg-filter-input hg-filter-select ' + customSelectClass + ' csel-dropdown"' + ((filter.hasOwnProperty('singleSelect') && filter.singleSelect) ? '' : ' multiple="multiple"') + ((filter.hasOwnProperty('actions') && filter.actions) ? ' data-actions="' + HugeGrid.htmlspecialchars(JSON.stringify(filter.actions)) + '"' : '') + ' ' + colId + '>';

						if( filter.hasOwnProperty('empty') && filter.empty && typeof(filter.empty) === 'object' )
							markup += HugeGrid.getFilterSelectOptionListHtml(idx, filter.empty);
						if( filter.hasOwnProperty('options') && filter.options && typeof(filter.options) === 'object' )
							markup += HugeGrid.getFilterSelectOptionListHtml(idx, filter.options);

						markup += '</select>';
						break;
					}
				}
			}

			html += '<div id="hgfc_' + this.id + '_' + cellInfo.id + '" data-key="' + cellInfo.id + '" class="hg-cell hg-filter hg-' + this.id + '-filter ' + rightClass + ' ' + bottomClass + ' hg-' + this.id + '-ds-' + cellInfo.id + ' hg-' + this.id + '-col-' + cellInfo.id + ccls + '">' + markup + '</div>';
		}
		else {
			for( i = 0, j = cellInfo.children.length - 1; i <= j; i++)
				html += this.getFilterCellHtml(cellInfo.children[i], ((i === j) ? rightClass : ''), bottomClass + ' hg-' + this.id + '-col-' + cellInfo.id);
		}
		return html;
	};

	HugeGrid.getFilterSelectOptionListHtml = function(selectionIndex, options) {
		var html = "";
		for( var i in options ) {
			if( !options.hasOwnProperty(i) )
				continue;
			var val, txt, dis;
			if( typeof options[i] === 'object' ) {
				if( typeof options[i].separator === "string" ) {
					html += '<option value="" disabled="disabled" data-separator="' + HugeGrid.htmlspecialchars(options[i].separator) + '">&mdash;&mdash;&mdash;</option>';
					continue;
				}
				val = options[i].value;
				txt = options[i].text;
				dis = options[i].disabled;
			}
			else {
				val = i;
				txt = options[i];
				dis = false;
			}
			html += HugeGrid.getFilterSelectOptionHtml(selectionIndex, dis, val, txt);
		}
		return html;
	};

	HugeGrid.getFilterSelectOptionHtml = function(selectionIndex, disabled, value, text) {
		var html = "";
		if( typeof value === "object" ) {
			html += '<optgroup label="' + HugeGrid.htmlspecialchars(text) + '">';
			html += HugeGrid.getFilterSelectOptionListHtml(selectionIndex, value);
			html += '</optgroup>';
		}
		else
			html += '<option value="' + HugeGrid.htmlspecialchars(value) + '"' + (disabled ? ' disabled="disabled"' : '') + (selectionIndex.hasOwnProperty(value) ? ' selected="selected"' : '') + '>' + HugeGrid.htmlspecialchars(text) + '</option>';
		return html;
	};

	HugeGrid.getFilterRangeViewHtml = function(data, type) {
		var from, to;
		if( typeof data === 'object' ) {
			from = data.hasOwnProperty('from') ? data.from : '';
			to = data.hasOwnProperty('to') ? data.to : '';
		}
		else
			from = to = data;

		if( from === null )
			from = '';
		if( to === null )
			to = '';

		var fromText = HugeGrid.htmlspecialchars(from.toString());
		var toText = HugeGrid.htmlspecialchars(to.toString());

		var hasError = false;
		var f, t;
		if( type === 'number' ) {
			f = (from === '') ? 0 : parseFloat(from);
			t = (to === '') ? 0 : parseFloat(to);
			if( isNaN(f) ) {
				fromText = 'NaN';
				hasError = true;
			}
			if( isNaN(t) ) {
				toText = 'NaN';
				hasError = true;
			}
		}
		else if( type === 'date' ) {
			f = HugeGrid.parseDate(from);
			t = HugeGrid.parseDate(to);
		}
		else {
			f = from;
			t = to;
		}

		var html;
		if( from === to )
			html = fromText;
		else if( from === '' || from === null )
			html = '<= ' + toText;
		else if( to === '' || to === null )
			html = '>= ' + fromText;
		else {
			if( f > t )
				hasError = true;
			html = fromText + ' - ' + toText;
		}

		return '<span title="' + html + '"' + (hasError ? ' class="has-error"' : '') + '>' + html + '</span>';
	};

	HugeGrid.prototype.getSortCellHtml = function(cellInfo, rightClass, bottomClass) {
		var html = '';
		if( cellInfo.children === null ) {
			var ccls = ' ' + this.getColumnClasses(cellInfo.id);
			var markup = cellInfo.nosort ? this.options.noSortMarkup : this.options.sortMarkup;
			if( this.sortKey === cellInfo.id ) {
				var mkid = this.sortDesc ? "hg-sort-desc" : "hg-sort-asc";
				markup = markup.replace(mkid, mkid + " hg-sort-selected");
			}
			html += '<div id="hgsc_' + this.id + '_' + cellInfo.id + '" data-key="' + cellInfo.id + '" class="hg-cell hg-sort hg-' + this.id + '-sort ' + rightClass + ' ' + bottomClass + ' hg-' + this.id + '-ds-' + cellInfo.id + ' hg-' + this.id + '-col-' + cellInfo.id + ccls + '">' + markup + '</div>';
		}
		else {
			for(var i = cellInfo.children.length - 1, j = 0; i >= 0; i--, j++)
				html += this.getSortCellHtml(cellInfo.children[j], ((i === 0) ? rightClass : ''), bottomClass + ' hg-' + this.id + '-col-' + cellInfo.id);
		}
		return html;
	};

	HugeGrid.prototype.getDataCellHtml = function(cellInfo, rowIdx, rightClass, bottomClass) {
		var html = '';
		if( typeof(this.data[rowIdx]) !== "object" )
			return '';
		if( cellInfo.children === null ) {
			var rowData = this.data[rowIdx];
			var content = (rowData.hasOwnProperty('content') && rowData.content.hasOwnProperty(cellInfo.id)) ? rowData.content[cellInfo.id] : '';
			var title = (rowData.hasOwnProperty('titles') && rowData.titles.hasOwnProperty(cellInfo.id)) ? rowData.titles[cellInfo.id] : '';
			var cls = (rowData.hasOwnProperty('classes') && rowData.classes.hasOwnProperty(cellInfo.id)) ? (' ' + rowData.classes[cellInfo.id]) : '';
			var ccls = ' ' + this.getColumnClasses(cellInfo.id);
			if( content !== null ) {
				if( typeof(content) !== 'string' )
					content = content.toString();
				content = content.replace('{hg-mark}', '<input type="checkbox" class="hg-mark" />');
			}
			else
				content = '';
			var attrHtml = '';
			var attrs = (rowData.hasOwnProperty('attributes') && rowData.attributes.hasOwnProperty(cellInfo.id)) ? rowData.attributes[cellInfo.id] : null;
			if( attrs && typeof attrs === "object" ) {
				for( var k in attrs ) {
					if( !attrs.hasOwnProperty(k) )
						continue;
					attrHtml += ' ' + k + '="' + HugeGrid.htmlspecialchars((typeof attrs[k] === "object") ? JSON.stringify(attrs[k]) : attrs[k]) + '"';
				}
			}
			html += '<div class="hg-cell hg-td hg-' + this.id + '-ds-' + cellInfo.id + ' ' + rightClass + ' ' + bottomClass + ' hg-' + this.id + '-col-' + cellInfo.id + cls + ccls + '" title="' + title + '"' + attrHtml + '>' + content + '</div>';
		}
		else {
			for(var i = cellInfo.children.length - 1, j = 0; i >= 0; i--, j++)
				html += this.getDataCellHtml(cellInfo.children[j], rowIdx, ((i === 0) ? rightClass : ''), bottomClass + ' hg-' + this.id + '-col-' + cellInfo.id);
		}
		return html;
	};

	HugeGrid.prototype.getRangeHTML = function(rangeId, range) {
		var col1 = this.getHeader(range.from);
		var col2 = this.getHeader(range.to);
		if( !col1 || !col2 )
			return '';

		var top = (typeof(range.top) === 'number') ? range.top : 0;
		var height = (typeof(range.height) === 'number') ? range.height : (this.options.rowHeight - top);

		var styles = 'left:' + col1.position + 'px;';
		styles += 'top:' + top + 'px;';
		styles += 'width:' + (col2.position - col1.position + col2.width) + 'px;';
		styles += 'height:' + height + 'px;';
		styles += 'line-height:' + (height - this.options.rangeBorderWidth * 2) + 'px;';
		if( range.hasOwnProperty('style') )
			styles += range.style;

		var extraClass = (typeof(range['class']) === 'string') ? (' ' + range['class']) : '';
		var title = (typeof(range['title']) === 'string') ? (' title="' + range['title']) + '"' : '';

		var html = '<div id="hgrng_' + this.id + '_' + rangeId + '" class="hg-range' + extraClass + '" style="' + styles + '"' + title + ' data-id="' + rangeId + '">';
		html += (typeof(range.content) !== 'undefined') ? range.content : '';
		html += '</div>';
		return html;
	};

	HugeGrid.prototype.getRowRangesHTML = function(rowIdx) {
		var rowData = this.getRowByIndex(rowIdx);
		if( !rowData || typeof(rowData.ranges) !== 'object' )
			return '';
		var html = '';
		for( var id in rowData.ranges ) {
			if( !rowData.ranges.hasOwnProperty(id) )
				continue;
			html += this.getRangeHTML(id, rowData.ranges[id]);
		}
		return html;
	};

	HugeGrid.prototype.getFooterCellHtml = function(cellInfo, rightClass) {
		var html = '';
		if( cellInfo.children === null ) {
			var footer = this.options.footer;
			var cls = (footer.hasOwnProperty('classes') && footer.classes.hasOwnProperty(cellInfo.id)) ? (' ' + footer.classes[cellInfo.id]) : '';
			var ccls = cls + ' ' + this.getColumnClasses(cellInfo.id);
			var content = (footer.hasOwnProperty('content') && footer.content.hasOwnProperty(cellInfo.id)) ? footer.content[cellInfo.id] : '';
			var title = (footer.hasOwnProperty('titles') && footer.titles.hasOwnProperty(cellInfo.id)) ? footer.titles[cellInfo.id] : '';

			html += '<div id="hgfc_' + this.id + '_' + cellInfo.id + '" title="' + title + '" class="hg-cell hg-tf hg-' + this.id + '-ds-' + cellInfo.id + ' hg-' + this.id + '-col-' + cellInfo.id + ccls + ' ' + rightClass + '" style="height:' + this.options.footerHeight + 'px;line-height:' + (this.options.footerHeight - 4) + 'px;">' + content + '</div>';
		}
		else {
			for(var i = cellInfo.children.length - 1, j = 0; i >= 0; i--, j++)
				html += this.getFooterCellHtml(cellInfo.children[j], (i === 0) ? rightClass : '');
		}
		return html;
	};
	HugeGrid.prototype.getCellCSS = function(cellInfo) {
		var css = '';
		var hw = this.getHeadCellWidth(cellInfo);
		if( cellInfo.children === null ) {
			css += '.hg-' + this.id + '-ds-' + cellInfo.id + '{position:relative;width:' + (hw + 1) + 'px;}';
		}
		else {
			css += '.hg-' + this.id + '-ds-' + cellInfo.id + '{position:relative;width:' + (hw + 1) + 'px;}';
			for(var i = cellInfo.children.length - 1, j = 0; i >= 0; i--, j++)
				css += this.getCellCSS(cellInfo.children[j]);
		}
		css += '.hg-' + this.id + '-col-' + cellInfo.id + '{' + this.getColumnCSSRules((cellInfo.hidden || hw <= 0), cellInfo.marked) + '}';
		return css;
	};

	HugeGrid.prototype.updateVisibleRowIndexes = function() {
		var rh = this.options.rowHeight + 1;
		var f = this.firstVisibleRowIdx, l = this.lastVisibleRowIdx;
		this.firstVisibleRowIdx = Math.max(0, Math.min(this.rowCount, Math.floor(this.vScrollPos / rh)));
		this.lastVisibleRowIdx =  Math.max(0, Math.min(this.rowCount, Math.floor((this.vScrollPos + this.containerHeight - 1) / rh)));
		if( typeof this.options.onViewUpdate === "function" )
			this.options.onViewUpdate.call(this, this.rowCount, this.firstVisibleRowIdx, this.lastVisibleRowIdx, f, l);
	};

	HugeGrid.prototype.refreshView = function() {
		var lastRow = this.rowCount - 1;
		var n1 = Math.max(this.firstVisibleRowIdx, 0);
		var n2 = Math.min(this.lastVisibleRowIdx, lastRow);
		this.refreshBlock(n1, n2, 0, -1);

		this.refreshHorizontalBlocks();
	};

	HugeGrid.prototype.refreshHorizontalBlocks = function(blockData, parentSelector) {
		var n1 = null, n2 = null;
		var left = this.hScrollPos, right = this.hScrollPos + this.containerWidth - 1;
		
		for( var i = this.hBlocks.length - 1; i >= 0; i-- ) {
			if( this.hBlocks[i][0] <= right && this.hBlocks[i][1] >= left ) {
				n1 = i;
				if( n2 === null )
					n2 = i;
			}
		}

		var first = this.firstVisibleHBlockIdx;
		var last = this.lastVisibleHBlockIdx;
		var $parent = this.$grid;
		
		if( typeof(blockData) === 'object' ) {
			first = blockData.hBlockVis[0];
			last = blockData.hBlockVis[1];
			$parent = $(parentSelector);
		}

		if( first === -1 ) {
			first = 0;
			last = this.hBlocks.length - 1;
			if( typeof(blockData) !== 'object' )
				this.lastVisibleHBlockIdx = last;
		}

		if( first !== n1 || last !== n2 ) {
			var thisObj = this;
			var showHBlock = function(idx, sw) {
				if( sw )
					$('.hg-' + thisObj.id + '-hb-' + idx, $parent).removeClass('hidden');
				else
					$('.hg-' + thisObj.id + '-hb-' + idx, $parent).addClass('hidden');
			};

			if( first < n1 )
				for( i = Math.min(n1 - 1, last); i >= first; i-- )
					showHBlock(i, false);
			else if( first > n1 )
				for( i = Math.min(first, n2); i >= n1; i-- )
					showHBlock(i, true);

			if( last < n2 )
				for( i = Math.max(last, n1); i <= n2; i++ )
					showHBlock(i, true);
			else if( last > n2 )
				for( i = Math.max(n2 + 1, first); i <= last; i++ )
					showHBlock(i, false);

			if( typeof(blockData) !== 'object' ) {
				this.firstVisibleHBlockIdx = n1;
				this.lastVisibleHBlockIdx = n2;
			}
		}
	};

	HugeGrid.prototype.refreshBlock = function(firstRowIdx, lastRowIdx, offset, level) {
		var b, b1, b2, bs;
		if( level < 0 ) { // root is a virtual block which is not restricted by superblockSize
			bs = this.blockLevelSize[0];
			b1 = 0;
			b2 = Math.floor((this.rowCount - 1) / bs);
			for( b = b1; b <= b2; b++ )
				this.refreshBlock(firstRowIdx, lastRowIdx, b * bs, 0);
			return;
		}

		var br1 = offset; // block's first row
		var br2 = offset + this.blockLevelSize[level] - 1; // block's last row
		var isInView = (firstRowIdx <= br2 && lastRowIdx >= br1);
		var blockData = this.blocks[level][br1];

		if( isInView ) {
			// since block is visible we should ensure it's data exists
			// so we would be able to find invisible blocks in dom faster
			if( typeof(blockData) !== "object" )
				blockData = this.blocks[level][br1] = {visible: false, html1: null, html2: null, loaded: false, hBlockVis: [-1, -1]};
			if( blockData.visible && level >= this.options.blockLevels - 1 )
				return;
			// the block is not visible yet or it is a superblock
			if( level >= this.options.blockLevels - 1 ) {
				var queued = false;
				if( blockData.html1 === null || blockData.html2 === null ) {
					var t = br1 * (this.options.rowHeight + 1);
					blockData.html1 = '<div class="hg-' + this.id + '-lblock" id="hgb1_' + this.id + '_' + br1 + '" style="top:' + t + 'px">' + this.options.loadingBlockHeadMarkup + '</div>';
					blockData.html2 = '<div class="hg-' + this.id + '-rblock" id="hgb2_' + this.id + '_' + br1 + '" style="top:' + t + 'px">' + this.options.loadingBlockContMarkup + '</div>';
					this.enqueueBlockLoading(br1);
					queued = true;
				}

				this.$headColContent.append(blockData.html1);
				this.$content.append(blockData.html2);

				if( !queued && blockData.loaded ) {
					var brc1 = Math.max(0, Math.min(this.rowCount - 1, br1));
					var brc2 = Math.max(0, Math.min(this.rowCount - 1, br2));
					for( var n = brc1; n <= brc2; n++ )
						if( this.data[n].marked ) {
							var $row = $('#hgr1_' + this.id + '_' + n);
							$('#hgr2_' + this.id + '_' + n).addClass("hg-marked-row");
							$row.addClass('hg-marked-row');
							$('.hg-mark', $row).prop('checked', true);
						}
					this.refreshHorizontalBlocks(blockData, '#hgb1_' + this.id + '_' + br1 + ', #hgb2_' + this.id + '_' + br1);
				}
			}
			else {
				bs = this.blockLevelSize[level + 1];
				b1 = Math.floor(br1 / bs);
				b2 = Math.floor(br2 / bs);
				for( b = b1; b <= b2; b++ )
					this.refreshBlock(firstRowIdx, lastRowIdx, b * bs, level + 1);
			}
			blockData.visible = true;
		}
		else {
			// check if block is already invisible and/or still does not exist in memory
			if( typeof(blockData) !== "object" ) return;
			if( !blockData.visible ) return;

			// hide the block
			if( level >= this.options.blockLevels - 1 ) {
				var $blk1 = $("#hgb1_" + this.id + '_' + br1);
				var $blk2 = $("#hgb2_" + this.id + '_' + br1);
				if( typeof(this.options.onBlockHide) === "function" )
					this.options.onBlockHide.call(this, br1, $blk1, $blk2);
				$blk1.remove();
				$blk2.remove();
				//alert("remove: hgb1_" + br1);
			}
			else {
				bs = this.blockLevelSize[level + 1];
				b1 = Math.floor(br1 / bs);
				b2 = Math.floor(br2 / bs);
				for( b = b1; b <= b2; b++ )
					this.refreshBlock(firstRowIdx, lastRowIdx, b * bs, level + 1);
			}
			blockData.visible = false;
		}
	};

	HugeGrid.prototype.enqueueBlockLoading = function(firstRowIdx) {
		var requests = this.loadQueue.req;
		if( typeof(requests[firstRowIdx]) === "object" )
			return; // check if queue already contains that block ... though this function should not be called twice for same block
		requests[firstRowIdx] = {
			id: firstRowIdx,
			lastId: firstRowIdx,
			loading: false
		};
	};

	HugeGrid.prototype.processLoadingQueue = function() {
		if( this.options.maxConcurrentLoads <= this.loadQueue.load )
			return; // too many blocks are already being loaded
		// detect blocks that are in view
		var b1 = Math.floor(this.firstVisibleRowIdx / this.options.blockSize) * this.options.blockSize;
		var b2 = Math.floor(this.lastVisibleRowIdx / this.options.blockSize) * this.options.blockSize;
		var requests = this.loadQueue.req;

		for(var bid in requests) {
			if( !requests.hasOwnProperty(bid) )
				continue;
			var req = requests[bid];
			if( typeof(req) !== "object" ) continue; // this should never happen, but check just in case ...
			if( req.loading ) continue; // already loading so skip it

			if( bid < b1 || bid > b2 ) {
				// if the request is not being loaded and it's outside the viewed area we cancel it's loading
				requests[bid] = null;
				delete requests[bid];
				this.blocks[this.options.blockLevels - 1][bid] = null;
				delete this.blocks[this.options.blockLevels - 1][bid];
				continue;
			}

			this.loadQueue.load++;
			req.loading = true;
			this.startBlockLoading(req);
			if( this.options.maxConcurrentLoads <= this.loadQueue.load )
				return; // too many blocks are already being loaded
		}
	};

	HugeGrid.prototype.startBlockLoading = function(loadRequest) {
		// need to copy because of multithreading
		var blockId = loadRequest.id;
		if( this.useAjaxLoading ) {
			var grid = this;
			var data = {
				gridId: this.id,
				dataSession: grid.dataSession, // required to do validation
				firstRow: blockId,
				rowCount: loadRequest.lastId - blockId + grid.options.blockSize, // block ids are actually indexes of their first rows
				sortKey: grid.sortKey,
				sortDesc: (grid.sortDesc ? 1 : 0),
				param: grid.dataParam
			};
			this.serializeFilterData(data);

			if( typeof grid.options.onBeforeRequestData === 'function' )
				grid.options.onBeforeRequestData.call(this, data);

			$.ajax({
				url: grid.readUrl,
				data: data,
				type: "POST",
				async: true,

				dataType: "json",
				/**
				 * @param {HugeGridAjaxResponse} resp
				 */
				success: function(resp) {
					if( typeof(resp.success) !== "boolean" || !resp.success ) {
						if( typeof(grid.options.onError) === "function" )
							grid.options.onError.call(grid, resp);
						return;
					}

					// check if this ajax request is not needed anymore (table data started to reload while waiting for the response)
					if( resp.dataSession !== grid.dataSession.toString() ) {
						grid.loadQueue.load--;
						grid.processLoadingQueue();
						return;
					}

					if( typeof grid.options.onRowDataReceived === 'function' )
						grid.options.onRowDataReceived.call(this, resp);

					var refreshView = false;
					if( grid.rowCount !== resp.totalRows ) {
						refreshView = true;
						grid.rowCount = resp.totalRows;
						grid.onRowCountChange();
					}

					if( typeof(grid.options.onRowCountUpdate) === "function" )
						grid.options.onRowCountUpdate(resp.totalRows, resp.totalUnfilteredRows);

					for( var rowIdx = resp.firstRow, i = 0; rowIdx <= resp.lastRow; rowIdx++, i++ ) {
						resp.data[i].blockId = blockId;
						grid.dataIndex[resp.data[i].id] = grid.data[rowIdx] = resp.data[i];
					}
					grid.onDataReady(blockId);
					if( refreshView ) {
						grid.refreshView();
						grid.processLoadingQueue();
					}
				},

				error: function() {
					// @todo retry loading
					grid.loadQueue.load--;
					grid.processLoadingQueue();
				}
			});
		}
		else {
			this.onDataReady(blockId);
		}
	};

	HugeGrid.prototype.onRowCountChange = function() {
		this.contentHeight = ((this.options.rowHeight + 1) * this.rowCount) - 1;
		this.$content.css({height: this.contentHeight + "px"});
		this.$headColContent.css({height: this.contentHeight + "px"});
		this.vScrollMax = Math.max(this.contentHeight - this.containerHeight - 1, 0);
		this.refreshScrollbars(true);
		this.updateVisibleRowIndexes();
	};

	HugeGrid.prototype.generateDataBlockHtml = function(blockId, updateDom) {
		var n, i, j;
		var lastRow = this.rowCount - 1;
		if( typeof blockId === "string" )
			blockId = parseInt(blockId);
		var blockData = this.blocks[this.options.blockLevels - 1][blockId];
		var colHtml = '', contentHtml = '';
		var n1 = Math.max(blockId, 0);
		var n2 = Math.min(blockId + this.options.blockSize - 1, lastRow);
		for( n = n1; n <= n2; n++ ) {
			var rowData = this.data[n];
			if( typeof(rowData) !== 'object' ) {
				setTimeout(function() {
					if( this.dataLost )
						alert('Error: Grid received less data than expected. Please reset or reapply the filter to reload the data.');
					else {
						this.dataLost = true;
						if( typeof(createFilter) === 'function' )
							createFilter(true);
						else {
							this.dataParam = null;
							this.reloadData(false);
						}
					}
				}, 10);
				break;
			}
			if( !rowData.hasOwnProperty("transformed") && typeof this.options.rowTransformer === "function" ) {
				typeof this.options.rowTransformer.call(this, rowData);
				rowData.transformed = true;
			}
			var rowClass = 'hg-row hg-' + this.id + '-row';
			if( typeof(rowData.rowClass) === "string" )
				rowClass += ' ' + rowData.rowClass;

			var attrHtml = '';
			var attrs = rowData.hasOwnProperty('rowAttributes') ? rowData.rowAttributes : null;
			if( attrs && typeof attrs === "object" ) {
				for( var k in attrs ) {
					if( !attrs.hasOwnProperty(k) )
						continue;
					attrHtml += ' ' + k + '="' + HugeGrid.htmlspecialchars((typeof attrs[k] === "object") ? JSON.stringify(attrs[k]) : attrs[k]) + '"';
				}
			}

			colHtml += '<div id="hgr1_' + this.id + '_' + n + '" class="' + rowClass + '"' + attrHtml + '>';
			contentHtml += '<div id="hgr2_' + this.id + '_' + n + '" class="' + rowClass + '"' + attrHtml + '>';
			var hb = 0, hbIdx;
			for( i = 0, j = this.options.header.length - 1; j >= 0; i++, j-- ) {
				hb = i - this.options.fixedColumns;
				if( hb < 0 )
					colHtml += this.getDataCellHtml(this.options.header[i], n, '', '');
				else {
					if( hb % this.options.hBlockSize === 0 && j > 0 ) {
						hbIdx = hb / this.options.hBlockSize;
						if( hb > 0 )
							contentHtml += '</div>';
						var hideBlock = hbIdx < this.firstVisibleHBlockIdx || hbIdx > this.lastVisibleHBlockIdx;
						contentHtml += '<div class="hg-hb hg-' + this.id + '-hb-' + hbIdx + (hideBlock ? ' hidden' : '')  + '">';
					}
					contentHtml += this.getDataCellHtml(this.options.header[i], n, '', '');
				}
			}
			colHtml += '</div>';
			if( hb > 0 )
				contentHtml += '</div>';

			contentHtml += this.getRowRangesHTML(n);
			contentHtml += '</div>';
		}

		var t = blockId * (this.options.rowHeight + 1);
		blockData.html1 = '<div class="hg-' + this.id + '-lblock" id="hgb1_' + this.id + '_' + blockId + '" style="top:' + t + 'px">' + colHtml + '</div>';
		blockData.html2 = '<div class="hg-' + this.id + '-rblock" id="hgb2_' + this.id + '_' + blockId + '" style="top:' + t + 'px"><div>' + contentHtml + '</div></div>';

		blockData.hBlockVis = [this.firstVisibleHBlockIdx, this.lastVisibleHBlockIdx];

		if( updateDom ) {
			$("#hgb1_" + this.id + '_' + blockId).html(colHtml);
			$("#hgb2_" + this.id + '_' + blockId).html(contentHtml);

			for( n = n1; n <= n2; n++ ) {
				if( this.data[n].marked ) {
					var $row = $('#hgr1_' + this.id + '_' + n);
					$('#hgr2_' + this.id + '_' + n).addClass("hg-marked-row");
					$row.addClass('hg-marked-row');
					$('.hg-mark', $row).prop('checked', true);
				}
			}
		}

	};

	HugeGrid.prototype.onDataReady = function(blockId) {
		this.loadQueue.load--;
		var requests = this.loadQueue.req;
		var req = requests[blockId];
		for( var br1 = blockId; br1 <= req.lastId; br1 += this.options.blockSize ) {
			this.generateDataBlockHtml(br1, true);
			if( br1 !== blockId ) {
				// block is loaded so it is not needed in the queue anymore
				requests[br1] = null;
				delete requests[br1];
			}
		}
		requests[blockId] = null;
		delete requests[blockId];

		this.processLoadingQueue();
	};

	HugeGrid.prototype.replaceCSSRules = function(colId, css) {
		this.$rules.text(function(){
			var reg = new RegExp('\.' + colId + '\{[^\}]*\}');
			var txt = $(this).text();
			var newCss = '.' + colId + '{' + css + '}';
			if( reg.test(txt) )
				return txt.replace(reg, newCss);
			return txt + newCss;
		});
	};

	/**
	 * @param {object} header
	 * @param {string|null} parentId
	 * @param {boolean} parentHidden
	 * @param {object} [columnCalc]
	 */
	HugeGrid.prototype.buildColumnIndex = function(header, parentId, parentHidden, columnCalc) {
		if( !columnCalc || typeof columnCalc !== 'object' )
			columnCalc = {index: 0, positionIndex: 0, position: [0, 0], width: 0};
		for( var i = 0; i < header.length; i++ ) {
			if( !parentId )
				columnCalc.positionIndex = (i < this.options.fixedColumns) ? 0 : 1;

			var hdr = header[i];

			if( typeof(hdr.id) === 'undefined' )
				continue;

			hdr.parentId = parentId;

			if( !hdr.hasOwnProperty('children') || typeof(hdr.children) !== 'object' || (hdr.children && hdr.children.length === 0) ) hdr.children = null;
			if( !hdr.hasOwnProperty('hidden') ) hdr.hidden = false;
			if( !hdr.hasOwnProperty('marked') ) hdr.marked = false;
			if( !hdr.hasOwnProperty('nosort') ) hdr.nosort = false;
			if( !hdr.hasOwnProperty('content') ) hdr.content = '';
			if( !hdr.hasOwnProperty('width') ) hdr.width = 150;
			if( !hdr.hasOwnProperty('sortType') ) hdr.sortType = 'string';
			if( !hdr.hasOwnProperty('filter') ) hdr.filter = null;

			if( hdr.filter )
				this.hasFilters = true;

			this.columnIndex[hdr.id] = hdr;

			hdr.index = columnCalc.index;
			hdr.fixed = (columnCalc.positionIndex === 0);
			hdr.position = columnCalc.position[columnCalc.positionIndex];

			var hidden = parentHidden || hdr.hidden;

			if( hdr.children !== null ) {
				var w = columnCalc.width;
				columnCalc.width = 0;
				this.buildColumnIndex(hdr.children, hdr.id, hidden, columnCalc);
				hdr.width = columnCalc.width - 1;
				columnCalc.width += w;
			}
			else {
				if( columnCalc.positionIndex === 0 )
					this.lastFixedColumn = hdr;
				else if( this.firstUnfixedColumn === null )
					this.firstUnfixedColumn = hdr;

				this.columnList.push(hdr);

				if( !hidden ) {
					columnCalc.position[columnCalc.positionIndex] += hdr.width + 1; // +1 for border
					columnCalc.width += hdr.width + 1;
				}

				columnCalc.index++;
			}
		}
	};

	HugeGrid.prototype.recalculateColumnPositions = function(header, parentId, parentHidden, columnCalc) {
		if( typeof(columnCalc) !== 'object' )
			columnCalc = {index: 0, positionIndex: 0, position: [0, 0], width: 0};
		for( var i = 0; i < header.length; i++ ) {
			if( !parentId )
				columnCalc.positionIndex = (i < this.options.fixedColumns) ? 0 : 1;

			var hdr = header[i];

			if( typeof(hdr.id) === 'undefined' )
				continue;

			var hidden = parentHidden || hdr.hidden;

			hdr.position = columnCalc.position[columnCalc.positionIndex];

			if( hdr.children !== null ) {
				var w = columnCalc.width;
				columnCalc.width = 0;
				this.recalculateColumnPositions(hdr.children, hdr.id, hidden, columnCalc);
				hdr.width = columnCalc.width - 1;
				columnCalc.width += w;
			}
			else if( !hidden ) {
				columnCalc.position[columnCalc.positionIndex] += hdr.width + 1; // +1 for border
				columnCalc.width += hdr.width + 1;
			}
		}
	};

	HugeGrid.prototype.getHeader = function(colId) {
		return (typeof(this.columnIndex[colId]) === 'object') ? this.columnIndex[colId] : null;
	};

	HugeGrid.prototype.getColumnCSSRules = function(hidden, marked) {
		return (hidden?'display:none;':'') + (marked?('background:' + this.options.markedColumnBackground + ';'):'');
	};

	HugeGrid.prototype.showColumn = function(colId, sw) {
		var hw;
		var hdr = this.getHeader(colId);
		if( hdr === null ) return;
		if( hdr.hidden !== sw ) return;
		hdr.hidden = !sw;

		if( sw ) {
			hw = this.getHeadCellWidth(hdr);
			if( hw > 0 ) {
				this.replaceCSSRules('hg-' + this.id + '-col-' + colId, this.getColumnCSSRules(false, hdr.marked));
				this.replaceCSSRules('hg-' + this.id + '-ds-' + colId, 'position:relative;width:' + (hw + 1) + 'px;');
				$('#hghm_' + this.id + '_' + colId).css({width: (hw + 1) + "px"});
			}
		}
		else {
			this.replaceCSSRules('hg-' + this.id + '-col-' + colId, this.getColumnCSSRules(true, hdr.marked));
		}

		var phdr = hdr;
		while( phdr.parentId ) {
			phdr = this.getHeader(phdr.parentId);
			if( phdr === null ) break;
			if( phdr.hidden ) break; // parent is hidden so the child should not be visible too
			hw = this.getHeadCellWidth(phdr);
			if( hw <= 0 ) {
				this.replaceCSSRules('hg-' + this.id + '-col-' + phdr.id, this.getColumnCSSRules(true, phdr.marked));
			}
			else {
				this.replaceCSSRules('hg-' + this.id + '-col-' + phdr.id, this.getColumnCSSRules(false, phdr.marked));
				this.replaceCSSRules('hg-' + this.id + '-ds-' + phdr.id, 'position:relative;width:' + (hw + 1) + 'px;');
				$('#hghm_' + this.id + '_' + phdr.id).css({width: (hw + 1) + "px"});
			}
		}

		this.recalculateColumnPositions(this.options.header, null, false);
		this.updateHorizontalBlocks();

		var sizes = this.calculateSizes();

		this.headWidth = sizes.headWidth;
		this.fullHeadWidth = this.headWidth + this.options.splitterWidth - 1;
		this.$headCornerContent.css({width: this.headWidth + "px"});
		this.$headColContent.css({width: this.headWidth + "px"});
		if( this.$footerCorner )
			this.$footerCorner.css({width: this.fullHeadWidth + "px"});
		if( this.$footerRow )
			this.$footerRow.css({left: this.fullHeadWidth + "px"});
		this.$headCorner.css({width: this.fullHeadWidth + "px"});
		this.$headRow.css({left: this.fullHeadWidth + "px"});
		this.$headCol.css({width: this.fullHeadWidth + "px"});
		this.$container.css({left: this.fullHeadWidth + "px"});
		this.replaceCSSRules('hg-' + this.id + '-lblock', 'position:absolute;left:0;width:' + this.headWidth + 'px;height:' + ((this.options.rowHeight + 1) * this.options.blockSize) + 'px;');

		this.contentWidth = sizes.contentWidth;
		this.$headRowContent.css({width: this.contentWidth + "px"});
		this.$content.css({width: this.contentWidth + "px"});
		if( this.$footerRowContent )
			this.$footerRowContent.css({width: this.contentWidth + "px"});
		this.replaceCSSRules('hg-' + this.id + '-rblock', 'position:absolute;left:0;width:' + this.contentWidth + 'px;height:' + ((this.options.rowHeight + 1) * this.options.blockSize) + 'px;');

		this.hScrollMax = Math.max(this.contentWidth - this.containerWidth - 1, 0);

		this.refreshScrollbars();
	};

	HugeGrid.prototype.markColumn = function(colId, mark) {
		var hdr = this.getHeader(colId);
		if( hdr === null ) return;
		if( hdr.marked === mark ) return;
		hdr.marked = mark;
		this.replaceCSSRules('hg-' + this.id + '-col-' + colId, this.getColumnCSSRules(hdr.hidden, hdr.marked));
	};

	HugeGrid.prototype.isColumnMarked = function(colId) {
		var hdr = this.getHeader(colId);
		if( hdr === null ) return false;
		return hdr.marked;
	};

	HugeGrid.prototype.getColumnClasses = function(colId) {
		var col = this.getHeader(colId);
		if( col === null ) return '';
		if( typeof(col._cssClass) !== 'string' ) {
			var cls = (col.parentId ? (this.getColumnClasses(col.parentId) + ' ') : '') + ((typeof(col['class']) === 'string') ? col['class'] : '');
			col._cssClass = cls.trim();
		}
		return col._cssClass;
	};

	HugeGrid.prototype.calculateSizes = function() {
		var i, j;
		var headLevels = 1, headWidth = 0, contentWidth = 0;
		for(i = this.options.header.length - 1, j = 0; i >= 0; i--, j++) {
			headLevels = Math.max(headLevels, this.getHeadCellLevels(this.options.header[i]));
			var colWidth = this.getHeadCellWidth(this.options.header[j]);
			if( colWidth <= 0 ) continue;
			if( j < this.options.fixedColumns )
				headWidth += colWidth + 1;
			else
				contentWidth += colWidth + 1;
		}

		return {
			headLevels: headLevels,
			headWidth: Math.max(headWidth, 0),
			contentWidth: Math.max(contentWidth, 0)
		};
	};

	HugeGrid.prototype.update = function() {
		var $this = this.$grid;

		var thisHeight = $this.height();
		var fullHeadHeight = this.fullHeadHeight;
		var fullFootHeight = (this.$footerCorner) ? (this.options.footerHeight + this.options.splitterWidth) : 0;

		this.containerHeight = thisHeight - fullHeadHeight - fullFootHeight - this.options.hScrollHeight;

		this.$headColBorder.css({"min-height": this.containerHeight + "px"});

		this.$container.css({height: this.containerHeight + "px"});
		this.$headCol.css({height: this.containerHeight + "px"});
		if( this.$vScroll )
			this.$vScroll.css({height: this.containerHeight + "px"});

		var thisWidth = $this.width();
		var fullHeadWidth = this.headWidth + this.options.splitterWidth - 1;
		this.containerWidth = thisWidth - fullHeadWidth - this.options.vScrollWidth;

		this.$container.css({width: this.containerWidth + "px"});
		this.$headRow.css({width: this.containerWidth + "px"});

		if( this.$footerCorner ) {
			this.$footerCorner.css({top: fullHeadHeight + this.containerHeight + 'px'});
			this.$footerRow.css({width: this.containerWidth + "px", top: fullHeadHeight + this.containerHeight + 'px'});
		}

		if( this.autoHeight ) {
			this.contentHeight = this.containerHeight + 1;
			if( this.$headColContent )
				this.$headColContent.css({height: this.contentHeight + 'px'});
			if( this.$content )
				this.$content.css({height: this.contentHeight + 'px'});
		}

		this.$hScroll.css({width: this.containerWidth + "px"});
		this.hScrollMax = Math.max(this.contentWidth - this.containerWidth - 1, 0);
		this.vScrollMax = Math.max(this.contentHeight - this.containerHeight - 1, 0);

		if( this.$vScroll )
			this.vScrollSize = this.$vScrollTumb.parent().innerHeight() - this.$vScrollTumb.outerHeight();
		this.hScrollSize = this.$hScrollTumb.parent().innerWidth() - this.$hScrollTumb.outerWidth();

		if( this.hScrollMax === 0 )
			this.$hScroll.css({display: 'none'});
		else
			this.$hScroll.css({display: ''});

		this.refreshScrollbars();
		this.updateVisibleRowIndexes();
		this.refreshView();
		this.processLoadingQueue();
	};

	HugeGrid.prototype.refreshScrollbars = function(rowCountChanged) {
		var p, scpos, stpos, scrolled = false;
		var rcc = (typeof(rowCountChanged) === "boolean" && rowCountChanged);
		p = this.hScrollPos / this.hScrollMax;
		if( p > 1 ) {
			p = 1;
			this.hScrollPos = this.hScrollMax;
			scrolled = true;
		}
		if( rcc || scrolled ) {
			scpos = '-' + this.hScrollPos + "px";
			this.$content.css({left: scpos});
			this.$headRowContent.css({left: scpos});
		}
		stpos = Math.floor(p * this.hScrollSize) + "px";
		this.$hScrollTumb.css({left: stpos});

		p = this.vScrollPos / this.vScrollMax;
		if( p > 1 ) {
			p = 1;
			this.vScrollPos = this.vScrollMax;
			scrolled = true;
		}
		if( rcc || scrolled ) {
			scpos = '-' + this.vScrollPos + "px";
			this.$content.css({top: scpos});
			this.$headColContent.css({top: scpos});
		}
		stpos = Math.floor(p * this.vScrollSize) + "px";
		if( this.$vScroll )
			this.$vScrollTumb.css({top: stpos});

		if( scrolled && typeof(this.options.onScroll) === "function" )
			this.options.onScroll.call(this, this.hScrollPos, this.vScrollPos);
	};

	HugeGrid.prototype.getRowByIndex = function(rowIdx) {
		return (typeof(this.data[rowIdx]) === "object") ? this.data[rowIdx] : null;
	};

	HugeGrid.prototype.getRow = function(rowId) {
		return (typeof(this.dataIndex[rowId]) === "object") ? this.dataIndex[rowId] : null;
	};

	HugeGrid.prototype.addRow = function(row) {
		this.addRows([row]);
	};

	HugeGrid.prototype.addRows = function(rows) {
		if( this.useAjaxLoading || rows.length === 0 )
			return;

		var height = this.$grid.height();

		var cnt = rows.length;
		for( var i = 0; i < cnt; i++ ) {
			var row = rows[i];
			this.options.data.push(row);
			height += this.options.rowHeight + 1;
			this.dataIndex[row.id] = row;
		}

		if( this.autoHeight )
			this.$grid.css({
				height: height + 'px'
			});

		this.reloadData(false);
		this.update();
	};

	HugeGrid.prototype.removeRow = function(id) {
		if( this.useAjaxLoading || typeof(this.dataIndex[id]) !== 'object' )
			return;

		var data = this.options.data;
		for( var i = data.length - 1; i >= 0; i-- ) {
			if( data[i].id === id ) {
				data.splice(i, 1);
				break;
			}
		}

		delete this.dataIndex[id];

		if( this.autoHeight ) {
			var height = this.$grid.height();
			height -= this.options.rowHeight + 1;
			this.$grid.css({
				height: height + 'px'
			});
		}

		this.reloadData(false);
		this.update();
	};

	HugeGrid.prototype.updateFooter = function(footer) {
		this.options.footer = footer;
		this.refreshFooterHTML();
		this.update();
	};

	HugeGrid.prototype.refreshFooterHTML = function() {
		if( this.$footerCorner ) {
			var i, j, cornerFootHtml = '', rowFootHtml = '';
			for( i = 0, j = this.options.header.length - 1; j >= 0; i++, j-- ) {
				if( i < this.options.fixedColumns )
					cornerFootHtml += this.getFooterCellHtml(this.options.header[i], '');
				else
					rowFootHtml += this.getFooterCellHtml(this.options.header[i], (j === 0) ? 'nrb' : '');
			}
			this.$footerCorner.html(cornerFootHtml);
			this.$footerRowContent.html(rowFootHtml);

			if( this.options.footer.hasOwnProperty('rowClass') ) {
				this.$footerCorner.attr('class', 'hg-footer-corner').addClass(this.options.footer.rowClass);
				this.$footerRowContent.attr('class', 'hg-footer-row-content').addClass(this.options.footer.rowClass);
			}
		}
	};

	HugeGrid.prototype.updateRow = function(row, updateDom) {
		this.updateRows([row], updateDom);
	};

	HugeGrid.prototype.updateRows = function(rows, updateDom) {
		if( rows.length === 0 )
			return;

		var updated = false;
		var data = this.useAjaxLoading ? this.data : this.options.data;
		var idIndex = {};
		var invalidateBlocks = {};
		for( var i = data.length - 1; i >= 0; i-- )
			idIndex[data[i].id] = i;
		for( i = rows.length - 1; i >= 0; i-- ) {
			var row = rows[i];
			if( typeof(this.dataIndex[row.id]) !== 'object' )
				continue;
			if( this.useAjaxLoading ) {
				row.blockId = this.dataIndex[row.id].blockId;
				invalidateBlocks[row.blockId] = true;
			}
			data[idIndex[row.id]] = row;
			this.dataIndex[row.id] = row;
			updated = true;
		}

		if( updated ) {
			if( this.useAjaxLoading ) {
				for( i in invalidateBlocks )
					this.generateDataBlockHtml(i, updateDom);
			}
			else
				this.reloadData(false);
			if( updateDom )
				this.update();
		}
	};

	HugeGrid.prototype.addOrUpdateRow = function(row) {
		if( this.useAjaxLoading )
			return;
		if( typeof(this.dataIndex[row.id]) === 'object' )
			this.updateRow(row);
		else
			this.addRow(row);
	};

	HugeGrid.prototype.onDefaultSort = function(colId, isDesc) {
		if( !this.useAjaxLoading && colId !== null ) {
			var col = this.getHeader(colId);
			this.data.sort(this.options.sortFunctions[col.sortType].bind(this, colId, isDesc));
		}
		return false; // FALSE means not to prevent default behaviour
	};

	HugeGrid.prototype.identifyTarget = function(targetDomElement) {
		var $target = $(targetDomElement);

		if( !$target.hasClass("hg-td") && !$target.hasClass("hg-th") && !$target.hasClass("hg-tf") && !$target.hasClass("hg-range") && !$target.hasClass("hg-filter") )
			$target = $target.closest(".hg-td,.hg-th,.hg-tf,.hg-range,.hg-filter,.hg-drop-down");
		if( $target.length === 0 )
			return null;

		var target = null;
		var isDropDown = $target.is('.hg-drop-down');
		if( isDropDown )
			target = {type: 'filter', colId: null, viewTarget: $target.data('target')};
		else if( $target.is('.hg-td') )
			target = {type: 'data', rowIdx: null, rowId: null, colId: null, row: null};
		else if( $target.is('.hg-th') )
			target = {type: 'header', colId: null};
		else if( $target.is('.hg-filter') )
			target = {type: 'filter', colId: null};
		else if( $target.is('.hg-tf') )
			target = {type: 'footer', colId: null};
		else if( $target.is('.hg-range') )
			target = {type: 'range', rowIdx: null, rowId: null, rangeId: null, row: null, range: null};

		if( target === null )
			return null;

		target.object = $target.get(0);

		if( target.type === 'data' || target.type === 'range' ) {
			var $row = $target.closest('.hg-row');
			if( $row.length > 0 ) {
				var ids = $row.attr("id").split('_');
				target.rowIdx = parseInt(ids[ids.length - 1]);
				target.row = this.getRowByIndex(target.rowIdx);
				target.rowId = target.row.id;
			}
		}

		if( isDropDown ) {
			target.colId = $target.data('col');
		}
		else if( target.type !== 'range' ) {
			var cls = $target.attr("class").match(/hg-[^\s]+-ds-([^\s]+)/);
			target.colId = cls[1];
		}
		else {
			target.rangeId = $target.data('id');
			target.range = target.row.ranges[target.rangeId];
		}

		return target;
	};

	HugeGrid.$activeDropDown = null;

	/**
	 * @deprecated Use instance method identifyTarget() instead.
	 * @param cellDomElement
	 * @returns {*}
	 */
	HugeGrid.identifyCell = function(cellDomElement) {
		var $cell = $(cellDomElement);
		if( !$cell.hasClass("hg-td") && !$cell.hasClass("hg-th") && !$cell.hasClass("hg-tf") )
			$cell = $cell.closest(".hg-td,.hg-th,.hg-tf");
		if( $cell.length === 0 ) return null;
		var isHead = $cell.hasClass("hg-th") || $cell.hasClass("hg-tf");
		var id;
		if( isHead )
			id = null;
		else {
			var $row = $cell.closest('.hg-row');
			if( $row.length === 0 ) return null;
			var ids = $row.attr("id").split('_');
			id = parseInt(ids[ids.length - 1]);
		}
		var cls = $cell.attr("class").match(/hg-[^\s]+-ds-([^\s]+)/);
		return {rowIdx: id, colId: cls[1]};
	};

	HugeGrid.getSortValue = function(row, colId, def) {
		if( row.hasOwnProperty('sortData') && row.sortData.hasOwnProperty(colId) )
			return row.sortData[colId];
		if( row.hasOwnProperty('data') && row.data.hasOwnProperty(colId) )
			return row.data[colId];
		if( row.hasOwnProperty('content') && row.content.hasOwnProperty(colId) )
			return row.content[colId];
		return def;
	};


	HugeGrid.$toolTip = null;
	HugeGrid.toolTipActive = null;
	HugeGrid.toolTipActivation = null;
	HugeGrid.toolTipDeactivation = null;

	HugeGrid.showToolTip = function(e, key, html) {
		if( HugeGrid.toolTipActive === key || (HugeGrid.toolTipActivation && HugeGrid.toolTipActivation.key === key) ) {
			// Abort deactivation and do nothing if there is an activation of this key in progress or the
			// tooltip is already active.
			if( HugeGrid.toolTipDeactivation ) {
				clearTimeout(HugeGrid.toolTipDeactivation);
				HugeGrid.toolTipDeactivation = null;
			}
			return;
		}

		HugeGrid.hideToolTip(true);
		if( html === null || html === '' )
			return;
		HugeGrid.toolTipActivation = {
			x: e.clientX,
			y: e.clientY,
			key: key,
			html: html,
			timer: setTimeout(function() {
				var act = HugeGrid.toolTipActivation;
				HugeGrid.toolTipActivation = null;
				HugeGrid.toolTipActive = act.key;

				if( !HugeGrid.$toolTip ) {
					HugeGrid.$toolTip = $('<div class="hg-tooltip" />');
					$('body').append(HugeGrid.$toolTip);
				}

				var $win = $(window);
				var ww = $win.width();
				var wh = $win.height();
				HugeGrid.$toolTip.addClass('active').css({
					'max-width': (ww - 40) + 'px',
					'max-height': (wh - 40) + 'px'
				}).html(act.html);

				HugeGrid.$toolTip.offset();
				var w = HugeGrid.$toolTip.outerWidth(false);
				var h = HugeGrid.$toolTip.outerHeight(false);

				var x = act.x;
				var y = act.y + 16;
				if( x > ww - w - 20 )
					x = ww - w - 20;
				if( y > wh - h - 20 )
					y = wh - h - 20;
				if( x < 20 )
					x = 20;
				if( y < 20 )
					y = 20;

				HugeGrid.$toolTip.css({
					left: x + 'px',
					top: y + 'px'
				});
			}, 500)
		};
	};

	HugeGrid.hideToolTip = function(instant) {
		if( instant ) {
			if( HugeGrid.toolTipActivation !== null ) {
				clearTimeout(HugeGrid.toolTipActivation.timer);
				HugeGrid.toolTipActivation = null;
			}
			if( HugeGrid.toolTipDeactivation ) {
				clearTimeout(HugeGrid.toolTipDeactivation);
				HugeGrid.toolTipDeactivation = null;
			}
			if( HugeGrid.toolTipActive ) {
				HugeGrid.$toolTip.removeClass('active');
				HugeGrid.toolTipActive = false;
			}
		}
		else if( !HugeGrid.toolTipDeactivation ) {
			HugeGrid.toolTipDeactivation = setTimeout(function() {
				HugeGrid.toolTipDeactivation = null;
				HugeGrid.hideToolTip(true);
			}, 10); // a little timeout needed to jump over mouseover/mouseout events triggered on same element
		}
	};

	HugeGrid.htmlspecialchars = function(text) {
		if( text === null )
			return '';
		if( typeof text !== 'string' )
			text = text.toString();
		return text.replace(/[&<>"']/g, function(chr) {
			return HugeGrid.htmlspecialchars.characterMap[chr];
		});
	};

	HugeGrid.htmlspecialchars.characterMap = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;'};

	/**
	 * @type {HugeGridOptions}
	 */
	HugeGrid.defaults = {
		id: null,

		splitterWidth: 2,		// border width between headings and data

		header: [],				// array of column definitions.
		fixedColumns: 0,		// number of columns that are not getting scrolled horizontally
		headRowHeight: 17,
		filterRowHeight: 26,
		markedColumnBackground: '#DDD',

		sortKey: null,			// column id to sort data by
		sortDesc: false,
		noSort: false,			// when TRUE the sort row is not rendered.
		autoSort: true,			// when TRUE grid automatically reorders rows when they change.
		sortRowHeight: 20,
		sortMarkup: '<div class="hg-sort-inner"><div class="hg-sort-desc"></div><div class="hg-sort-asc"></div></div>',
		noSortMarkup: '',

		data: [],				// an array containing rows or a string containing url to load data from. sample row record: {id: "156", content: {"-1": "My name", "-2": "My surname"}}
		dataType: "json",		// used only with ajax loading. only "json" supported for now
		dataParam: null,
		filter: null,
		rowHeight: 16,			// height in pixels (without borders)
		rowCount: 0,			// automatically updated so it is not necessary
		blockSize: 8,			// how many rows are in one block
		hBlockSize: 16,			// how many root level columns / column groups are in one horizontal block
		superblockSize: 16,		// how many blocks/superblocks may be contained in one higher level superblock
		blockLevels: 4,			// how many levels of blocks / superblocks should be used
		maxConcurrentLoads: 3,	// how many blocks are allowed to get loaded at the same time via ajax. value greater than 3 is not recommended.
		preloadRows: 10,		// how many rows that are outside the view area should be preloaded
		loadingBlockHeadMarkup: '<div class="hg-block-loading" />', // the markup added to the block that is not yet loaded via ajax (left part)
		loadingBlockContMarkup: '<div class="hg-block-loading" />', // the markup added to the block that is not yet loaded via ajax (right part)

		rangeBorderWidth: 1,

		selectionMode: 'none',  // what type of selection is allowed. Possible values: 'none' (no selection), 'single' (only columns on a single row), 'multiple' (multiple columns and rows).
		selectionMinColumnId: null, // what is the left most allowed selected column id
		selectionMaxColumnId: null, // what is the right most allowed selected column id

		footer: null,
		footerHeight: 19,

		hScrollPos: 0,
		vScrollPos: 0,
		hScrollHeight: 32,
		vScrollWidth: 32,
		hScrollSpeed: 360,
		vScrollSpeed: 120,
		hScrollMarkup: '<div class="hg-hscroll-tumb" />',
		vScrollMarkup: '<div class="hg-vscroll-tumb" />',

		touchScrollSensitivity: 5,
		touchContextMenuTime: 1,
		dblTapTime: 0.5,

		// function(rowData)
		rowTransformer: null,

		// function(colId, isDesc) // return true if want to cancel sort switching
		onSort: function(colId, isDesc) { return this.onDefaultSort(colId, isDesc); },

		// function(target)
		onMarkChange: null,

		// function(target) Grid will not be reloaded if function returns FALSE.
		onFilterChange: null,

		// function(event, delta, deltaX, deltaY) Must return TRUE to allow default grid scrolling.
		onBeforeWheelScroll: null,

		// function(target)
		onMouseDown: null,

		// function(target)
		onMouseUp: null,

		// function(target)
		onSelectionStart: null,

		// function(target)
		onSelectionChange: null,

		// function(target)
		onSelectionEnd: null,

		// function(target)
		onClick: null,

		// function(target)
		onDblClick: null,

		// function(event, target) Must return FALSE if default grid behaviour should be prevented.
		onTouchStart: null,

		// function(event, target) Must return FALSE if default grid behaviour should be prevented.
		onTouchMove: null,

		// function(event, target) Must return FALSE if default grid behaviour should be prevented.
		onTouchEnd: null,

		// function(event, target)
		onTap: null,

		// function(event, target)
		onDblTap: null,

		// function(event, target) Must return FALSE to prevent further context menu events.
		onTouchContextMenuStart: null,

		// function()
		onTouchContextMenuCancel: null,

		// function(event, target) Must return TRUE to prevent further grid scrolling and tap callbacks if context menu was shown or any action taken.
		onTouchContextMenu: null,

		// function(target)
		onOver: null,

		// function(target)
		onOut: null,

		// function(selection)
		onSelect: null,

		// function(selection)
		onDeselect: null,

		// function(rowIdxFrom, rowIdxTo)
		onLoad: null,

		// function(rowIdxFrom, rowIdxTo)
		onUnload: null,

		// function(hScrollPos, vScrollPos)
		onScroll: null,

		// function(resp)
		onError: null,

		// function(firstRowIdx, $leftBlockDomElement, $rightBlockDomElement)
		onBlockHide: null,

		// function(filteredRows, unfilteredRows)
		onRowCountUpdate: null,

		// function(requestData)
		onBeforeRequestData: null,

		// function(response)
		onRowDataReceived: null,

		// function(rowCount, firstVisibleRowIdx, lastVisibleRowIdx, previousFirstVisibleRowIdx, previousLastVisibleRowIdx)
		onViewUpdate: null,

		// each key is column id and value is callback function(colId, isDesc, rowA, rowB)
		sortFunctions: {
			'string': function(colId, isDesc, a, b) {
				var v1 = HugeGrid.getSortValue(a, colId, '');
				var v2 = HugeGrid.getSortValue(b, colId, '');
				if(v1 === v2)
					return 0;
				return ((v1 < v2) ? -1 : 1) * (isDesc ? -1 : 1);
			},
			'numeric': function(colId, isDesc, a, b) {
				var v1 = HugeGrid.getSortValue(a, colId, 0);
				var v2 = HugeGrid.getSortValue(b, colId, 0);

				if( typeof(v1) !== 'number') {
					v1 = parseFloat(v1.replace(/[^0-9.\-]+/g, ''));
					if( isNaN(v1) ) v1 = 0;
				}

				if( typeof(v2) !== 'number') {
					v2 = parseFloat(v2.replace(/[^0-9.\-]+/g, ''));
					if( isNaN(v2) ) v2 = 0;
				}

				if(v1 === v2)
					return 0;
				return ((v1 < v2) ? -1 : 1) * (isDesc ? -1 : 1);
			}
		}
	};

	HugeGrid.nextAutoId = 0;

	HugeGrid.gridTrackingMouseUp = null;
	HugeGrid.mouseOverGrid = null;

	$.hugeGrid = HugeGrid;

	$(document)
		.on('mousedown', function(e) {
			HugeGrid.hideToolTip(true);
			if( HugeGrid.$activeDropDown ) {
				if( HugeGrid.$activeDropDown[0] !== e.target && !$.contains(HugeGrid.$activeDropDown[0], e.target) && $(e.target).closest('.ui-widget').length === 0 ) {
					HugeGrid.$activeDropDown.removeClass('active');
					HugeGrid.$activeDropDown = null;
				}
			}
		})
		.on('mouseup', function(e) {
			var inst = $.hugeGrid.gridTrackingMouseUp;
			if( !inst ) return;
			$.hugeGrid.gridTrackingMouseUp = null;
			inst.onMouseUp(e);
		});

	$(window).on('mousewheel wheel', function(e) {
		if( HugeGrid.mouseOverGrid && $(e.target).closest(".csel-options").length === 0 ) {
			/** @var {number} e.originalEvent.wheelDeltaX */
			/** @var {number} e.originalEvent.wheelDeltaY */
			var deltaX = Math.min(Math.max(e.originalEvent.hasOwnProperty("wheelDeltaX") ? e.originalEvent.wheelDeltaX : -e.originalEvent.deltaX, -1), 1);
			var deltaY = Math.min(Math.max(e.originalEvent.hasOwnProperty("wheelDeltaY") ? e.originalEvent.wheelDeltaY : -e.originalEvent.deltaY, -1), 1);
			var delta = deltaX ? deltaX : deltaY;
			
			if( typeof HugeGrid.mouseOverGrid.options.onBeforeWheelScroll === 'function' )
				if( !HugeGrid.mouseOverGrid.options.onBeforeWheelScroll.call(HugeGrid.mouseOverGrid, e, delta, deltaX, deltaY) )
					return;
			if( HugeGrid.mouseOverGrid.scrollBy(-deltaX * HugeGrid.mouseOverGrid.options.hScrollSpeed, -deltaY * HugeGrid.mouseOverGrid.options.vScrollSpeed) ) {
				e.preventDefault();
				e.stopImmediatePropagation();
			}
		}
	});

	/**
	 * @param {HugeGridOptions|string} options
	 * @return {JQuery | HTMLElement | *}
	 */
	$.fn.hugeGrid = function(options) {
		var hgArgs = arguments;
		var retVal;

		var $grids = $(this);
		retVal = $grids;

		$grids.each(function() {
			var $this = $(this);

			if( typeof(options) === "string" ) {
				var instance = $this.data("hugeGrid");
				if( !instance )
					return;
				switch(options) {
					case "scrollBy": instance.scrollBy(hgArgs[1], hgArgs[2]); break;
					case "scrollTo": instance.scrollTo(hgArgs[1], hgArgs[2]); break;
					case "markRow": instance.markRow(hgArgs[1], hgArgs[2]); break;
					case "showColumn": instance.showColumn(hgArgs[1], hgArgs[2]); break;
					case "markColumn": instance.markColumn(hgArgs[1], hgArgs[2]); break;
					case "update": instance.update(); break;
					case "reloadData": instance.reloadData(false); break;
					case "setDataParam": instance.dataParam = instance.options.dataParam = hgArgs[1]; break;
					case "updateFooter": instance.updateFooter(hgArgs[1]); break;
					case "getFilterData": retVal = $.extend({}, instance.getFilterData()); break;
					case "resetFilter": instance.resetFilter(); break;
					case "getCellDimensions": retVal = instance.getCellDimensions(hgArgs[1], hgArgs[2]); break;
					case "getRowByIndex": retVal = instance.getRowByIndex(hgArgs[1]); break;
					case "getRow": retVal = instance.getRow(hgArgs[1]); break;
					case "addRow": instance.addRow(hgArgs[1]); break;
					case "addRows": instance.addRows(hgArgs[1]); break;
					case "updateRow": instance.updateRow(hgArgs[1], (hgArgs.length > 1) ? hgArgs[2] : true); break;
					case "updateRows": instance.updateRows(hgArgs[1], (hgArgs.length > 1) ? hgArgs[2] : true); break;
					case "addOrUpdateRow": instance.addOrUpdateRow(hgArgs[1]); break;
					case "removeRow": instance.removeRow(hgArgs[1]); break;
					case "sort": instance.sort(hgArgs[1], hgArgs[2]); break;
					case "data":
						if( typeof(hgArgs[1]) === 'object' ) {
							var dataParam = (typeof(hgArgs[2]) === 'undefined') ? null : hgArgs[2];
							instance.setData(hgArgs[1], dataParam);
						}
						else if( typeof(hgArgs[1]) === 'function' )
							hgArgs[1].call(instance, instance.data, instance.dataParam);
						else
							retVal = instance.data;
						break;
					case "beginCursorTracking": instance.beginCursorTracking(hgArgs[1]); break;

					case "rowTransformer": instance.options.rowTransformer = hgArgs[1]; break;

					case "onSort": instance.options.onSort = hgArgs[1]; break;
					case "onMarkChange": instance.options.onMarkChange = hgArgs[1]; break;
					case "onFilterChange": instance.options.onFilterChange = hgArgs[1]; break;
					case "onBeforeWheelScroll": instance.options.onBeforeWheelScroll = hgArgs[1]; break;
					case "onMouseDown": instance.options.onMouseDown = hgArgs[1]; break;
					case "onMouseUp": instance.options.onMouseUp = hgArgs[1]; break;
					// case "onMouseMove": instance.options.onMouseMove = hgArgs[1]; break;
					case "onSelectionStart": instance.options.onSelectionStart = hgArgs[1]; break;
					case "onSelectionChange": instance.options.onSelectionChange = hgArgs[1]; break;
					case "onSelectionEnd": instance.options.onSelectionEnd = hgArgs[1]; break;
					case "onSelect": instance.options.onSelect = hgArgs[1]; break;
					case "onDeselect": instance.options.onDeselect = hgArgs[1]; break;
					case "onClick": instance.options.onClick = hgArgs[1]; break;
					case "onDblClick": instance.options.onDblClick = hgArgs[1]; break;
					case "onTap": instance.options.onTap = hgArgs[1]; break;
					case "onDblTap": instance.options.onDblTap = hgArgs[1]; break;
					case "onTouchContextMenuStart": instance.options.onTouchContextMenuStart = hgArgs[1]; break;
					case "onTouchContextMenu": instance.options.onTouchContextMenu = hgArgs[1]; break;
					case "onTouchContextMenuCancel": instance.options.onTouchContextMenuCancel = hgArgs[1]; break;
					case "onOver": instance.options.onOver = hgArgs[1]; break;
					case "onOut": instance.options.onOut = hgArgs[1]; break;
					case "onLoad": instance.options.onLoad = hgArgs[1]; break;
					case "onUnload": instance.options.onUnload = hgArgs[1]; break;
					case "onScroll": instance.options.onScroll = hgArgs[1]; break;
					case "onError": instance.options.onError = hgArgs[1]; break;
					case "onBlockHide": instance.options.onBlockHide = hgArgs[1]; break;
					case "onRowCountUpdate": instance.options.onRowCountUpdate = hgArgs[1]; break;
					case "onBeforeRequestData": instance.options.onBeforeRequestData = hgArgs[1]; break;
					case "onRowDataReceived": instance.options.onRowDataReceived = hgArgs[1]; break;
					case "onViewUpdate": instance.options.onViewUpdate = hgArgs[1]; break;
					default:
						console.error("Method '" + options + "' is not implemented in huge grid.");
				}
				return;
			}

			new HugeGrid(this, options);
		});
		return retVal;
	};
	$.hugeGrid = {
		htmlspecialchars: HugeGrid.htmlspecialchars
	};
})(jQuery);